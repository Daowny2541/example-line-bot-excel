const functions = require('firebase-functions')

const { googleSheetCredential} = require('./config')
const { reply} = require('./helpers/line')
const { salaryMessage, profileMessage, monthMessage, msgTest, salaryOtherDebit, meIncomeOther } = require('./helpers/line/messages')
const { getGoogleSheetDataSalary, getGoogleSheetDataTest} = require('./helpers/googleSheets')
const { validateRegistered, registerUser } = require('./helpers/firebase')

//https://ecbe60c2b938.ngrok.io/botslipexcel/us-central1/lineWebhook 

exports.lineWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const { type, message, source: { userId: lineUserID } } = req.body.events[0]
    const isTextMessage = type === 'message' && message.type === 'text'

    if (isTextMessage) {
      const messageFromUser = message.text.trim()
      const checkRegister = messageFromUser.split('ลงทะเบียน:')
      const needToRegister = checkRegister && checkRegister[1]
      const checkSalary = messageFromUser.split('เดือน:')
      const monPay = checkSalary[1]
      const isRegister = await validateRegistered(lineUserID)

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

        registerUser(lineUserID, empCodeForRegister)
        return replyMessage(req.body, res, 'ลงทะเบียนเรียบร้อย')
      } 
      else 
      {
        switch (messageFromUser) {
          case 'ลงทะเบียน':
              if (isRegister) {
                // return replyMessage(req.body, res, 'คุณได้ทำการลงทะเบียนไว้แล้ว')
                const { empCode } = isRegister
                const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
                const profileMe = employees.values.filter(([employeeIDCard]) => employeeIDCard === empCode.toString())[0]

                console.log(profileMe)

                return replyMessage(req.body, res, profileMessage(profileMe), 'flex')
              }
              
            return replyMessage(req.body, res, 'กรุณาพิมพ์ ลงทะเบียน:รหัสพนักงาน เช่น ลงทะเบียน:123456')

          case 'เช็คเงินเดือนล่าสุด':

            if (!isRegister) {
              return replyMessage(req.body, res, 'กรุณาลงทะเบียนก่อนใช้งาน')
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
          return replyMessage(req.body, res, 'กรุณาพิมพ์ เดือน:หมายเลขประจำเดือนนั้น เช่น เดือน:1')

          case `เดือน:5`:
            
            if (isRegister) {
              const {empCode}  = isRegister
              //console.log(empCode + ',' + monPay)
              const employees1 = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
              const hasEmployee1 = employees1.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[1]

              //console.log(empCode + ',' + monPay)
              
              return replyMessage(req.body, res,  monthMessage(hasEmployee1), 'flex')
              //console.log(value1)
            }
            return replyMessage(req.body, res, 'ไม่พบข้อมูล กรุณาลงทะเบียนก่อนใช้งาน')

          case `เดือน:4`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[2]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return replyMessage(req.body, res, 'ไม่พบข้อมูล กรุณาลงทะเบียนก่อนใช้งาน')

          case `เดือน:3`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[3]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return replyMessage(req.body, res, 'ไม่พบข้อมูล กรุณาลงทะเบียนก่อนใช้งาน')

          case `เดือน:2`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[4]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return replyMessage(req.body, res, 'ไม่พบข้อมูล กรุณาลงทะเบียนก่อนใช้งาน')

          case `เดือน:1`:
          
          if (isRegister) {
            const {empCode}  = isRegister
            //console.log(empCode + ',' + monPay)
            const employees = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_SHEET1)
            const hasEmployee = employees.values.filter(([empCodeMe]) => empCodeMe === empCode.toString())[5]

            //console.log(empCode + ',' + monPay)
            
            return replyMessage(req.body, res,  monthMessage(hasEmployee), 'flex')
            //console.log(value1)
          }
          return replyMessage(req.body, res, 'ไม่พบข้อมูล กรุณาลงทะเบียนก่อนใช้งาน')
          
        } 
        return replyMessage(req.body, res, 'ขอโทษค่ะ! ฉันยังไม่ฉลาดพอที่จะเข้าใจคุณ')
      }
      //return replyMessage(req.body, res, 'ขอโทษ! เนื้องจากบริการนี้อยู่ในช่วงการพัฒนา')
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

