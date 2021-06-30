const { getGoogleSheetDataSalary} = require('../googleSheets')
const { googleSheetCredential} = require('../../config')
const {replyAccount} = require('../../helpers/line')

class reply_message {
    async receivedPostback(events) {
      const payload = JSON.parse(events.postData.contents)

    }

    async accountName() {
      const rowH = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_ROWH_SHEET3)
      const rowI = await getGoogleSheetDataSalary(googleSheetCredential.RANGE_ROWI_SHEET3)

      const reply_text = "✔แผนกเครื่องเขียน\n\n"

      for (j = 1; j < rowH.length; j++) {
        if (rowH[j] == "") {
          break
        }
        reply_text += "." + rowH[j] + " " + rowI[j] + "/n"
      }
      reply_text += "\nจัดทำข้อมูลโดย © iton5";

      const postData = {
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "ขอแจ้งรายการให้คุณทราบ",
              "align": "center",
              "weight": "bold",
              "size": "lg",
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#23441c"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": reply_text,
              "weight": "bold",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "Stock สินค้า",
              "align": "end",
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#898989"
        }
      }

    }

    async replyMonthMessage(bodyRequest, message){
      pushMonth(bodyRequest, message)
      return res.status(200).send('ok')
    }
    
}