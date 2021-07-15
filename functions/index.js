const functions = require('firebase-functions')

const { googleSheetCredential, lineCredential} = require('./config')
const { reply, linkRichMenu} = require('./helpers/line')
const { salaryMessage, meIncomeOther, monthMessage, msgTest, msgDetailForRegister} = require('./helpers/line/messages')
const { getGoogleSheetDataSalary, getGoogleSheetDataTest} = require('./helpers/googleSheets')
const { validateRegistered, registerUserUpdate, registerUser } = require('./helpers/firebase')
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

        const hasBeenRegistered = await validateRegistered(lineUserID)
          if (hasBeenRegistered) {
            return replyMessage(req.body, res, 'ไม่สามารถลงทะเบียนซ้ำได้')
          }

        const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
        const hasEmployeeIdCard = employees.values.some(([employeeIdCard]) => employeeIdCard === idCard.toString())

          if (!hasEmployeeIdCard) {
            return replyMessage(req.body, res, 'รหัสพนักงานไม่ตรงกับที่มีในระบบ')
          }

          registerUser(lineUserID, idCard)
        return replyMessage(req.body, res, 'ลงทะเบียนด้วยรหัสพนักงาน พิมพ์ รหัสพนักงาน:1234')
      } else
      if (needToRegister) {
        const empCodeForRegister = checkRegister[1] 
        
        const hasBeenRegistered = await validateRegistered(lineUserID)
          if (hasBeenRegistered) {
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployee = employees.values.some(([,employeeEmpCode]) => employeeEmpCode === empCodeForRegister.toString())

              if (!hasEmployee) {
                return replyMessage(req.body, res, 'รหัสพนักงานไม่ตรงกับที่มีในระบบ')
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

          return replyMessage(req.body, res, 'ไม่สามารถลงทะเบียนซ้ำได้')
      } 
      else 
      {
        switch (messageFromUser) {
          case 'ลงทะเบียน':
            return replyMessage(req.body, res, msgDetailForRegister, 'flex')

          case 'เช็คเงินเดือนล่าสุด':
            if (!isRegister) {
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
          return replyMessage(req.body, res, msgTest, 'flex')

          case `พฤษภาคม`:
            
            if (isRegister) {
              const {empCode}  = isRegister
              const employees1 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployee1 = employees1.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[1]
              
              return replyMessage(req.body, res,  monthMessage(hasEmployee1), 'flex')
            }
            return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `เมษายน`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[2]
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `มีนาคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[3]
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `กุมภาพันธ์`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[4]
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `มกราคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[5]
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `ธันวาคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([,empCodeMe]) => empCodeMe === empCode.toString())[6]
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
          
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
              if (num[_i][4] === monPay.toString()) {
                _i = _i+2
                userData.push(record)
              }
                console.log(num)
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

