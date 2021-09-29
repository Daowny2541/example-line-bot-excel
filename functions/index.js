const functions = require('firebase-functions')

const { googleSheetCredential, lineCredential} = require('./config')
const { replyFlex, linkRichMenu, replyMessage} = require('./helpers/line')
const { salaryMessage, meIncomeOther, meDeductOther, monthMessage, msgBtnMonth, msgDetailForRegister} = require('./helpers/line/messages')
const { getGoogleSheetDataSalary} = require('./helpers/googleSheets')
const { readMonth, validateUser, validateRegistered, registerUserUpdate, registerUser, registerUserDelete } = require('./helpers/firebase')
const { compute_alpha } = require('googleapis')
const line = require('@line/bot-sdk')

//https://ecbe60c2b938.ngrok.io/botslipexcel/us-central1/lineWebhook 

exports.lineWebhook = functions.https.onRequest(async (req, res) => {

  try {
    const events = req.body.events;
    var richMenuId1 = 'richmenu-b7aeee763491cb7e6f41d1cd87508ac2'
    var richMenuId2 = 'richmenu-2a8420170ee5e7d623089a9987f0fc97'
    var client = new line.Client({
      channelAccessToken: `${lineCredential.ACCESS_TOKEN}`
    });

    for (const event of events) {
      if (event.type === "message") {
        if (event.message.type === "text") {
          var messageFromUser = event.message.text.trim()
          var isRegister = await validateRegistered(event.source.userId)
          const checkIdCardRegister = messageFromUser.split('ID1@')
          const needRegisterFromIdCard = checkIdCardRegister && checkIdCardRegister[1]
          const checkRegister = messageFromUser.split('ID2@')
          const needToRegister = checkRegister && checkRegister[1]
          const checkSalaryAll = messageFromUser.split('กด ')
          const monthAllPay = checkSalaryAll[1]
          if (needRegisterFromIdCard) {
              if (!isRegister) {
                const idCardForRegister = checkIdCardRegister[1]
                const isUser = await validateUser(idCardForRegister)
                if(!isUser) {
                  const employeesIdCard = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
                  const hasEmployeeIdCard = employeesIdCard.values.some(([employeeIdCard]) => employeeIdCard === normalize(idCardForRegister.toString()))
                  
                    if (!hasEmployeeIdCard) {
                      await replyMessage(event.replyToken, 'รหัสบัตรประชาชนไม่ตรงกับที่มีในระบบ กรุณากรอกรหัสบัตรประชาชนของตนเองให้ถูกต้อง')
                    }
      
                    registerUser(event.source.userId, idCardForRegister)
                    await replyMessage(event.replyToken, 'พิมพ์ ID2(ตัวพิมพ์ใหญ่เท่านั้น)@รหัสพนักงาน โดยไม่ต้องเว้นวรรค\nตัวอย่าง ID2@999999') 
                }
                await replyMessage(event.replyToken, 'ลงทะเบียนซ้ำหรือรหัสบัตรประชาชนนี้เคยทำการสมัครมาแล้วโดยใช้เครื่องอื่น')
              }
              await replyMessage(event.replyToken, 'พิมพ์ ID2(ตัวพิมพ์ใหญ่เท่านั้น)@รหัสพนักงาน โดยไม่ต้องเว้นวรรค\nตัวอย่าง ID2@999999')
          } else
          if (needToRegister) {
              if (isRegister) {
                const empCodeForRegister = checkRegister[1] 
                const { idCard } = isRegister
                const employeesEmpCode = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
                const hasEmployee = employeesEmpCode.values.some(([empIdCode,employeeEmpCode]) => empIdCode === normalize(idCard.toString()) && employeeEmpCode === empCodeForRegister.toString())
    
                  if (!hasEmployee) {
                    await replyMessage(event.replyToken, 'รหัสพนักงานไม่ตรงกับที่มีในระบบ กรุณากรอกรหัสพนักงานของตนเองให้ถูกต้อง')
                  }
    
                client.getProfile(event.source.userId).then((profile) => {
                  registerUserUpdate(profile.userId, empCodeForRegister, profile.displayName)
                })
                .catch((err) => {
                  // error handling
                  console.log(err.message)
                });
              
                await replyMessage(event.replyToken, 'ลงทะเบียนเรียบร้อย')
                return linkRichMenu(req.body.events[0].source.userId, richMenuId2)
              }
              await replyMessage(event.replyToken, 'กรุณาลงทะเบียนก่อน')
            return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
          } else
          if (messageFromUser === 'ลงทะเบียน') {
            if (!isRegister) {
              await replyFlex(event.replyToken, msgDetailForRegister) 
              return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
            }
            await replyMessage(event.replyToken, 'ไม่สามารถลงทะเบียนซ้ำได้ เนื่องจากคุณได้ทำการลงทะเบียนไว้แล้ว')
          } else if (messageFromUser === 'เช็คเงินเดือนล่าสุด') {
            if (!isRegister) {
              await replyMessage(event.replyToken, 'กรุณาลงทะเบียนก่อน')
            return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
            }
            const { empCode } = isRegister
            const salaryEmployees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const me = salaryEmployees.values.filter(([,employeeIDCard]) => employeeIDCard === empCode.toString())[0]
            const num = me[15]
              readMonth(event.source.userId, num)
            await replyFlex(event.replyToken, salaryMessage(me))
          } else if (messageFromUser === 'รายได้อื่น ๆ เพิ่มเติม') {
            if (isRegister) {
              const { empCode, monPay} = isRegister
              const employeesDebit = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET2)
              const hasEmployeeDebit = employeesDebit.values.filter(([,empCodeMe,,,,allMonth]) => empCodeMe === empCode.toString() && allMonth === monPay.toString())
              if (hasEmployeeDebit.length > 0) {
                await replyFlex(event.replyToken,  meIncomeOther(hasEmployeeDebit.map((data) => data[10]+' '+numberToStringCurrency(data[12])+' บาท'+'\n')))
              }
              await replyMessage(event.replyToken, 'ไม่พบรายได้อื่น ๆ เพิ่มเติม')
            } 
          } else if (messageFromUser === 'รายการหักอื่น ๆ เพิ่มเติม') {
            if (isRegister) {
              const { empCode, monPay} = isRegister
              const employeesCredit = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET3)
              const hasEmployeeCredit = employeesCredit.values.filter(([,empCodeMe,,,,allMonth]) => empCodeMe === empCode.toString() && allMonth === monPay.toString())
              if (hasEmployeeCredit.length > 0) {
                await replyFlex(event.replyToken,  meIncomeOther(hasEmployeeDebit.map((data) => data[10]+' '+numberToStringCurrency(data[12])+' บาท'+'\n')))
              }
              await replyMessage(event.replyToken, 'ไม่พบรายการหักอื่น ๆ เพิ่มเติม')
            } 
          } else if (messageFromUser === `เช็คเงินเดือนย้อนหลัง`) {
              if (!isRegister) {
                await replyMessage(event.replyToken, 'กรุณาลงทะเบียนก่อน')
                return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
              }
              await replyFlex(event.replyToken, msgBtnMonth)
          } else if (messageFromUser === `กด ${monthAllPay}`) {
            if (isRegister) {
              const {empCode}  = isRegister
              const employeesMon = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployeeMon = employeesMon.values.filter(([,empCodeMe, ,	,	,	,	,	,	,	,	,	, ,	, ,	allMonth]) => empCodeMe === empCode.toString() && allMonth === monthAllPay.toString())
    
              if (row == undefined) {
                for (let i = 0; i < hasEmployeeMon.length; i++) {
                  var row = hasEmployeeMon[i];
                  var numMon = row[15]
                  readMonth(event.source.userId, numMon)
                  await replyFlex(event.replyToken, monthMessage(row))
                }
                await replyMessage(event.replyToken, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
              }
            }
          } else {
            await replyMessage(event.replyToken, 'ขอโทษครับ/ค่ะ  รายละเอียดที่ใส่ไม่ตรงตามที่เงื่อนไขกำหนด')
          }
        } else {
          await replyMessage(event.replyToken, 'ไม่ตรงตามที่เงื่อนไขกำหนด');
        }
      }
    };
    return res.end();
  } catch (error) {
    console.error(error.message)
    return res.status(400).send('error')
  }

});

const numberToStringCurrency = (amount) => {
  return Intl.NumberFormat().format(amount)
}

const normalize = (idCard) => {
 //normalize string and remove all unnecessary characters
 idCard = idCard.replace(/[^\d]/g, "");

 //check if number length equals to 10
 if (idCard.length == 13) {
     //reformat and return phone number
     return idCard.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5');
 }

 return null;
}

