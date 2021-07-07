const functions = require('firebase-functions')

const { googleSheetCredential, lineCredential} = require('./config')
const { reply, linkRichMenu} = require('./helpers/line')
const { salaryMessage, profileMessage, monthMessage, msgTest, msgDetailForRegister} = require('./helpers/line/messages')
const { getGoogleSheetDataSalary, getGoogleSheetDataTest} = require('./helpers/googleSheets')
const { validateRegistered, registerUser } = require('./helpers/firebase')
const { compute_alpha } = require('googleapis')
const line = require('@line/bot-sdk')

//https://ecbe60c2b938.ngrok.io/botslipexcel/us-central1/lineWebhook 

exports.lineWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const { type, message, source: { userId: lineUserID } } = req.body.events[0]
    const isTextMessage = type === 'message' && message.type === 'text'
    const client = new line.Client({
      channelAccessToken: `${lineCredential.ACCESS_TOKEN}`
    });

    console.log("User id: " + req.body.events[0].source.userId)

    if (isTextMessage) {
      const messageFromUser = message.text.trim()
      const checkRegister = messageFromUser.split('ลงทะเบียน:')
      const needToRegister = checkRegister && checkRegister[1]
      const checkSalary = messageFromUser.split('เดือน')
      const monPay = checkSalary[1]
      const isRegister = await validateRegistered(lineUserID)
      const richMenuId1 = 'richmenu-b7aeee763491cb7e6f41d1cd87508ac2'
      const richMenuId2 = 'richmenu-2a8420170ee5e7d623089a9987f0fc97'

      if (needToRegister) {
        const empCodeForRegister = checkRegister[1]
        const hasBeenRegistered = await validateRegistered(lineUserID)

          if (hasBeenRegistered) {
            return replyMessage(req.body, res, 'ไม่สามารถลงทะเบียนซ้ำได้')
          }

          const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
          const hasEmployee = employees.values.some(([employeeEmpCode]) => employeeEmpCode === empCodeForRegister.toString())

          if (!hasEmployee) {
            return replyMessage(req.body, res, 'รหัสพนักงานไม่ตรงกับที่มีในระบบ')
          }

        client.getProfile(lineUserID).then((profile) => {
          console.log(profile.displayName);
          console.log(profile.statusMessage);
          registerUser(profile.userId, empCodeForRegister, profile.displayName)
        })
        .catch((err) => {
          // error handling
        });
        
        replyMessage(req.body, res, 'ลงทะเบียนเรียบร้อย')
        return linkRichMenu(req.body.events[0].source.userId, richMenuId2)
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
            const me = employees.values.filter(([employeeIDCard]) => employeeIDCard === empCode.toString())[0]
            //console.log(me)
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
              //console.log(empCode + ',' + monPay)
              const employees1 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployee1 = employees1.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[1]

              //console.log(empCode + ',' + monPay)
              
              return replyMessage(req.body, res,  monthMessage(hasEmployee1), 'flex')
              //console.log(value1)
            }
            return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `เมษายน`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[2]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `มีนาคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[3]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `กุมภาพันธ์`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[4]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `มกราคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[5]
            const test = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())

            console.log(test)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)

          case `ธันวาคม`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[6]
            const test = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())

            console.log(test)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return linkRichMenu(req.body.events[0].source.userId, richMenuId1)
          
          case `เดือน${monPay}`:
          //   const members = [ 
          //     {name: "Eve", age: 24}, 
          //     {name: "Adam", age: 48}, 
          //     {name: "Chris", age: 18}, 
          //     {name: "Danny", age: 30}
          //  ]
            const employees1 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const employees2 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_ROWI_SHEET1)

            if (isRegister) {
              const {empCode}  = isRegister
              const result1 = employees1.values.filter(([empCodeMe]) => {
                return empCodeMe == empCode.toString()
              })
              const result2 = employees2.values.filter(([month]) => {
                return month == 6
              })
              console.log(result1)
            }
           
           // [{name: "Adam", age: 48}, {name: "Danny", age: 30}]
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

