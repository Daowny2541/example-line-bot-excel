const axios = require('axios')
const { lineCredential } = require('../../config')
const request = require("request-promise")
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message'

const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${lineCredential.ACCESS_TOKEN}`
}

const reply = async (bodyResponse, message, type, altText = 'เงินเดือนพนักงาน') => {
  let messages = [{ type: `text`, text: message }]
    if (type === 'flex') {
        messages = [{ type: 'flex', altText, contents: message }]
    } 
    try {
        const response = await axios({
          method: 'post',
          url: `${LINE_MESSAGING_API}/reply`,
          data: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages
          }),
          headers: LINE_HEADER
        })
        return response
      } catch (error) {
        console.log(error.message)
        const response = await axios({
          method: 'post',
          url: `${LINE_MESSAGING_API}/reply`,
          data: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages : [{ type: `text`, text: "ไม่พบข้อมูลในช่วงเวลาดังกล่าว" }]
          }),
          headers: LINE_HEADER
        })
        return response
      }
}

const linkRichMenu = async (uid, richMenuId) => {
  await request.post({
    uri: `https://api.line.me/v2/bot/user/${uid}/richmenu/${richMenuId}`,
    headers: {Authorization: `Bearer ${lineCredential.ACCESS_TOKEN}`}
  });
}


module.exports = { reply, linkRichMenu }