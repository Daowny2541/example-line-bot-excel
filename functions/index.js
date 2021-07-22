const functions = require('firebase-functions')

const { googleSheetCredential, lineCredential} = require('./config')
const { reply, linkRichMenu} = require('./helpers/line')
const { salaryMessage, meIncomeOther, monthMessage, msgTest, msgDetailForRegister, msgDetailForRegisterValidate} = require('./helpers/line/messages')
const { getGoogleSheetDataSalary, getGoogleSheetDataTest} = require('./helpers/googleSheets')
const { validateRegistered, registerUserUpdate, registerUser, registerUserDelete } = require('./helpers/firebase')
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
      const checkSalary = messageFromUser.split('เดือน')
      const monPay = checkSalary[1]
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
            return replyMessage(req.body, res, 'ลงทะเบียนด้วยรหัสพนักงานโดยพิมพ์คำว่า รหัสพนักงาน:ตามด้วยรหัสพนักงาน 6 หลัก')
          }

        return replyMessage(req.body, res, 'ไม่สามารถลงทะเบียนซ้ำได้')
      } else
      if (needToRegister) {
        const empCodeForRegister = checkRegister[1] 
          if (isRegister) {
            const { idCard } = isRegister
            console.log(idCard)

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
            });
          
            replyMessage(req.body, res, 'ลงทะเบียนเรียบร้อย')
            return linkRichMenu(req.body.events[0].source.userId, richMenuId2)
          }

          return replyMessage(req.body, res, 'การลงทะเบียนไม่สมบูรณ์ กรุณาตรวจสอบตามขั้นตอนวิธีการลงทะเบียนให้ถูกต้อง')
      } 
      else 
      {
        switch (messageFromUser) {
          case 'ลงทะเบียน':
            if (!isRegister) {
              return replyMessage(req.body, res, msgDetailForRegister, 'flex')
            }
            registerUserDelete(lineUserID)
          return  replyMessage(req.body, res, msgDetailForRegisterValidate, 'flex')
         // return linkRichMenu(req.body.events[0].source.userId, richMenuId2)

          case 'เช็คเงินเดือนล่าสุด':
            if (!isRegister) {
              replyMessage(req.body, res, 'กรุณาลงทะเบียนก่อน')
              return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
            }
            const { empCode } = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const me = employees.values.filter(([,employeeIDCard]) => employeeIDCard === empCode.toString())[0]
            return replyMessage(req.body, res, salaryMessage(me), 'flex')

          case 'รายได้อื่น ๆ เพิ่มเติม':
            return replyMessage(req.body, res, 'ขอโทษค่ะ! เนื่องจากบริการนี้อยู่ในช่วงการพัฒนา')

          case `รายการหักอื่น ๆ เพิ่มเติม`:
            return replyMessage(req.body, res, 'ขอโทษค่ะ! เนื่องจากบริการนี้อยู่ในช่วงการพัฒนา')

          case `เช็คเงินเดือนย้อนหลัง`:
            if (isRegister) {
              return replyMessage(req.body, res, msgTest, 'flex')

            }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `พฤษภาคม`:
            
            if (isRegister) {
              const {empCode}  = isRegister
              const employees1 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployee1 = employees1.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[1]
              if (hasEmployee1 == undefined) {
                return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
              }
              return replyMessage(req.body, res,  monthMessage(hasEmployee1), 'flex')
            }

          case `เมษายน`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[2]
            if (hasEmployee == undefined) {
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }

          case `มีนาคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[3]
            if (hasEmployee == undefined) {
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }

          case `กุมภาพันธ์`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[4]
            
            if (hasEmployee == undefined) {
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }

          case `มกราคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[5]
            if (hasEmployee == undefined) {
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }

          case `ธันวาคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[6]

            if (hasEmployee == undefined) {
              return replyMessage(req.body, res, 'ไม่พบข้อมูลในช่วงเวลาดังกล่าว')
            }
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }
          
          case `เดือน${monPay}`:
            const employees1 = await getGoogleSheetDataTest(googleSheetCredential.RANGE_SHEET3)
            const hasEmployee = employees1.values.filter(([empCodeMe]) => empCodeMe === "107333")
            const rowH = await getGoogleSheetDataTest(googleSheetCredential.RANGE_ROWH_SHEET3)
            const rowI = await getGoogleSheetDataTest(googleSheetCredential.RANGE_ROWI_SHEET3)

            //console.log(JSON.stringify(hasEmployee))
            var data = {}
            var userData = []
            for (var _i = 0; _i < hasEmployee.length; _i++) {
              var num = hasEmployee[_i]
              var record = {}
              record['monPay'] = num[4]
            }
            data.user = userData
            //var result = JSON.stringify(data)
            console.log(data)

          return replyMessage(req.body, res, 'ไม่พบข้อมูล กรุณาลงทะเบียนก่อนใช้งาน')

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

