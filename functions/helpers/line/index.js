const axios = require('axios')
const { lineCredential } = require('../../config')
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot'

const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${lineCredential.ACCESS_TOKEN}`
}

const replyFlex = (replyToken, message) => {
  let messages = [{ type: 'flex', altText: 'เงินเดือนพนักงาน', contents: message }]

    return axios({
      method: 'post',
      url: `${LINE_MESSAGING_API}/message/reply`,
      data: JSON.stringify({
        replyToken: replyToken,
        messages
      }),
      headers: LINE_HEADER
    })
};

const linkRichMenu = async (uid, richMenuId) => {
  return axios({
    method: 'post',
    url: `${LINE_MESSAGING_API}/user/${uid}/richmenu/${richMenuId}`,
    headers: {Authorization: `Bearer ${lineCredential.ACCESS_TOKEN}`}
  })
};

const replyMessage = (token, message) => {
  let messages = [{ type: `text`, text: message }]
    return axios({
      method: 'post',
      url: `${LINE_MESSAGING_API}/message/reply`,
      data: JSON.stringify({
        replyToken: token,
        messages
      }),
      headers: LINE_HEADER
    })
};


module.exports = { replyFlex, linkRichMenu, replyMessage}