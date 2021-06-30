const axios = require('axios')
const { lineCredential } = require('../../config')
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
        return null
      }
}

const replyAccount = async (bodyResponse, message) => {
  let messages = [{ type: `text`, text: message }]

  try {
      const response = await axios({
        method: 'post',
        url: `${LINE_MESSAGING_API}/reply`,
        data: {
          replyToken: bodyResponse.events[0].replyToken,
          messages
          // messages = [
          //   { 
          //     type: 'flex', 
          //     altText: 'flex message', 
          //     contents: {
          //       "type": "bubble",
          //       "header": {
          //         "type": "box",
          //         "layout": "vertical",
          //         "contents": [
          //           {
          //             "type": "text",
          //             "text": "ขอแจ้งรายการให้คุณทราบ",
          //             "align": "center",
          //             "weight": "bold",
          //             "size": "lg",
          //             "color": "#ffffff"
          //           }
          //         ],
          //         "backgroundColor": "#23441c"
          //       },
          //       "body": {
          //         "type": "box",
          //         "layout": "vertical",
          //         "contents": [
          //           {
          //             "type": "text",
          //             "text": message.empCode,
          //             "weight": "bold",
          //             "wrap": true
          //           }
          //         ]
          //       },
          //       "footer": {
          //         "type": "box",
          //         "layout": "horizontal",
          //         "contents": [
          //           {
          //             "type": "text",
          //             "text": "Stock สินค้า",
          //             "align": "end",
          //             "color": "#ffffff"
          //           }
          //         ],
          //         "backgroundColor": "#898989"
          //       }
          //     }
          //   }
          // ]
        },
        headers: LINE_HEADER
      })
      return response
    } catch (error) {
      console.log(error.message)
      return null
    }
}


module.exports = { reply, replyAccount}