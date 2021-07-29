const functions = require('firebase-functions')

const { googleSheetCredential, lineCredential} = require('./config')
const { reply, linkRichMenu} = require('./helpers/line')
const { salaryMessage, meIncomeOther, meDeductOther, monthMessage, msgBtnMonth, msgDetailForRegister} = require('./helpers/line/messages')
const { getGoogleSheetDataSalary} = require('./helpers/googleSheets')
const { readMonth, validateRegistered, registerUserUpdate, registerUser, registerUserDelete } = require('./helpers/firebase')
const { compute_alpha } = require('googleapis')
const line = require('@line/bot-sdk')

//https://ecbe60c2b938.ngrok.io/botslipexcel/us-central1/lineWebhook 

exports.lineWebhook = functions.runWith({ memory: '2GB', timeoutSeconds: 360 }).https.onRequest(async (req, res) => {
  try {
    const { type, message, source: { userId: lineUserID } } = req.body.events[0]
    const isTextMessage = type === 'message' && message.type === 'text'
    const client = new line.Client({
      channelAccessToken: `${lineCredential.ACCESS_TOKEN}`
    });

    if (isTextMessage) {
      const messageFromUser = message.text.trim()
      const checkRegister = messageFromUser.split('รหัสพนักงาน:')
      const checkIdCardRegister = messageFromUser.split('รหัสบัตรประชาชน:')
      const needToRegister = checkRegister && checkRegister[1]
      const needRegisterFromIdCard = checkIdCardRegister && checkIdCardRegister[1]
      const checkSalary = messageFromUser.split('เดือน ')
      const monTest = checkSalary[1]
      const checkSalaryAll = messageFromUser.split('กด ')
      const monthAllPay = checkSalaryAll[1]
      const isRegister = await validateRegistered(lineUserID)
      const richMenuId1 = 'richmenu-b7aeee763491cb7e6f41d1cd87508ac2'
      const richMenuId2 = 'richmenu-2a8420170ee5e7d623089a9987f0fc97'

      if (needRegisterFromIdCard) {
        const idCard = checkIdCardRegister[1]
          if (!isRegister) {
            const employeesIdCard = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployeeIdCard = employeesIdCard.values.some(([employeeIdCard]) => employeeIdCard === idCard.toString())
            
              if (!hasEmployeeIdCard) {
                return replyMessage(req.body, res, 'รหัสบัตรประชาชนไม่ตรงกับที่มีในระบบ กรุณากรอกรหัสบัตรประชาชนของตนเองให้ถูกต้อง')
              }

              registerUser(lineUserID, idCard)
            return replyMessage(req.body, res, 'พิมพ์รหัสพนักงาน ตามรูปแบบตัวอย่าง โดยไม่ต้องเว้นวรรค\nตัวอย่าง รหัสพนักงาน:999999')
          }

        return replyMessage(req.body, res, 'ไม่สามารถลงทะเบียนซ้ำได้หรือการลงทะเบียนก่อนหน้าไม่สำเร็จ กรุณาลงทะเทียนใหม่อีกครั้ง')
      } else
      if (needToRegister) {
        const empCodeForRegister = checkRegister[1] 
          if (isRegister) {
            const { idCard } = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.some(([empIdCode,employeeEmpCode]) => empIdCode === idCard.toString() && employeeEmpCode === empCodeForRegister.toString())

              if (!hasEmployee) {
                return replyMessage(req.body, res, 'รหัสพนักงานไม่ตรงกับที่มีในระบบ กรุณากรอกรหัสพนักงานของตนเองให้ถูกต้อง')
              }

            client.getProfile(lineUserID).then((profile) => {
              registerUserUpdate(profile.userId, empCodeForRegister, profile.displayName)
            })
            .catch((err) => {
              // error handling
              console.log(err.message)
            });
          
            replyMessage(req.body, res, 'ลงทะเบียนเรียบร้อย')
            return linkRichMenu(req.body.events[0].source.userId, richMenuId2)
          }

          return replyMessage(req.body, res, 'กรุณาลงทะเบียนก่อน')
      } 
      else 
      {
        switch (messageFromUser) {
          case 'ลงทะเบียน':
            if (!isRegister) {
              return replyMessage(req.body, res, msgDetailForRegister, 'flex')
            }
            registerUserDelete(lineUserID)
            return replyMessage(req.body, res, msgDetailForRegister, 'flex')

          case 'เช็คเงินเดือนล่าสุด':
            if (!isRegister) {
              replyMessage(req.body, res, 'กรุณาลงทะเบียนก่อน')
              return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
            }
            const { empCode } = isRegister
            console.log(empCode)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const me = employees.values.filter(([,employeeIDCard]) => employeeIDCard === empCode.toString())[0]
            const num = me[15]
            readMonth(lineUserID, num)
            return replyMessage(req.body, res, salaryMessage(me), 'flex')

          case 'รายได้อื่น ๆ เพิ่มเติม':
            if (isRegister) {
              const { empCode, monPay} = isRegister
              const employeesDebit = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET2)
              const hasEmployeeDebit = employeesDebit.values.filter(([,empCodeMe,,,,allMonth]) => empCodeMe === empCode.toString() && allMonth === monPay.toString())
              if (hasEmployeeDebit.length > 0) {
                console.log(hasEmployeeDebit.map((data) => data[10]+' '+data[12]+'บาท'))
                return replyMessage(req.body, res,  meIncomeOther(hasEmployeeDebit.map((data) => data[10]+' '+data[12]+'บาท'+'\n')), 'flex')
              }
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }

          case `รายการหักอื่น ๆ เพิ่มเติม`:
            if (isRegister) {
              const { empCode, monPay} = isRegister
              const employeesCredit = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET3)
              const hasEmployeeCredit = employeesCredit.values.filter(([,empCodeMe,,,,allMonth]) => empCodeMe === empCode.toString() && allMonth === monPay.toString())
              if (hasEmployeeCredit.length > 0) {
                console.log(hasEmployeeCredit.map((data) => data[10]+' '+data[12]+'บาท'))
                return replyMessage(req.body, res,  meDeductOther(hasEmployeeCredit.map((data) => data[10]+' '+data[12]+'บาท'+'\n')), 'flex')
              }
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }

          case `เช็คเงินเดือนย้อนหลัง`:
            if (isRegister) {
              return replyMessage(req.body, res, msgBtnMonth, 'flex')
            }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `กด ${monthAllPay}` :
            if (isRegister) {
              const {empCode}  = isRegister
              const employees1 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployee1 = employees1.values.filter(([,empCodeMe, ,	,	,	,	,	,	,	,	,	, ,	, ,	allMonth]) => empCodeMe === empCode.toString() && allMonth === monthAllPay.toString())
  
              if (row == undefined) {
                for (i = 0; i < hasEmployee1.length; i++) {
                  var row = hasEmployee1[i];
                  var numMon = row[15]
                  readMonth(lineUserID, numMon)
                  return replyMessage(req.body, res, monthMessage(row), 'flex')
                }
                return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
              }
            }
            
        } 
        return replyMessage(req.body, res, 'ขอโทษครับ/ค่ะ  รายละเอียดที่ใส่ไม่ตรงตามที่กำหนดเงื่อนไข')
      }
    }

    res.status(200).send('ok')
  } catch (error) {
    console.error(error.message)
    res.status(400).send('error')
  }
})

const replyMessage = (bodyRequest, res, message, type) => {
  reply(bodyRequest, message, type)
  return res.status(200).send('ok')
}

