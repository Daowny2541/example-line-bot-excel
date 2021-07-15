const { getGoogleSheetDataSalary} = require('../googleSheets')
const { googleSheetCredential} = require('../../config')

const numberToStringCurrency = (amount) => {
    return Intl.NumberFormat().format(amount)
}
const salaryMessage = ([empCode, emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	idCard,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName]) => {
  //console.log(monPay)
  return {
      type: "bubble",
      size: "mega",
      direction: "ltr",
      styles: {
        header: {
          backgroundColor: "#FAFAFAFF",
          separator: true,
          separatorColor: "#C4C4C4"
        },
        body: {
          separatorColor: "#C4C4C4",
          separator: true,
          backgroundColor: "#FAFAFAFF"
        },
        footer: {
          backgroundColor: "#FAFAFAFF"
        }
      },
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            contents: [],
            size: "md",
            weight: "bold",
            gravity: "center",
            text: `รายละเอียดเงินเดือน`,
            color: "#000000",
            align: "center"
          },
          {
            type: "box",
            layout: "horizontal",
            spacing: "md",
            contents: [
              {
                contents: [],
                align: "start",
                text: "ชื่องวดที่จ่าย",
                type: "text",
                gravity: "center",
                size: "xs",
                weight: "regular",
                color: "#747474",
                wrap: true,
                margin: "md"
              },
              {
                margin: "md",
                wrap: true,
                align: "end",
                contents: [],
                color: "#747474",
                text: "งวดของวันที่",
                gravity: "center",
                type: "text",
                style: "normal",
                size: "xs",
                weight: "regular"
              }
            ],
            margin: "md"
          },
          {
            spacing: "md",
            margin: "md",
            type: "box",
            layout: "horizontal",
            contents: [
              {
                wrap: true,
                align: "start",
                weight: "regular",
                gravity: "center",
                text: `${namePay}`,
                size: "xs",
                margin: "xxl",
                style: "normal",
                color: "#000000",
                contents: [],
                type: "text"
              },
              {
                wrap: true,
                text: `${payDate}`,
                margin: "md",
                size: "xs",
                align: "end",
                type: "text",
                contents: [],
                color: "#000000",
                gravity: "center",
                weight: "regular"
              }
            ]
          }
        ]
      },
      body: {
        layout: "vertical",
        type: "box",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                weight: "regular",
                contents: [],
                type: "text",
                margin: "xs",
                size: "sm",
                color: "#747474",
                text: "รายละเอียดรายได้",
                align: "start",
                wrap: true,
                gravity: "center"
              },
              {
                contents: [
                  {
                    contents: [],
                    style: "normal",
                    margin: "lg",
                    align: "start",
                    type: "text",
                    color: "#000000",
                    wrap: true,
                    text: "เงินเดือน",
                    size: "xs",
                    gravity: "center",
                    weight: "regular"
                  },
                  {
                    type: "text",
                    text: `${numberToStringCurrency(salary)}`,
                    size: "xxs",
                    weight: "regular",
                    align: "end",
                    wrap: true,
                    contents: [],
                    margin: "md",
                    gravity: "center",
                    color: "#000000"
                  }
                ],
                layout: "horizontal",
                type: "box",
                spacing: "md",
                margin: "md"
              },
              {
                contents: [
                  {
                    margin: "lg",
                    weight: "regular",
                    wrap: true,
                    type: "text",
                    style: "normal",
                    gravity: "center",
                    align: "start",
                    contents: [],
                    color: "#000000",
                    size: "xs",
                    text: "รายได้อื่น ๆ"
                  },
                  {
                    contents: [],
                    type: "text",
                    weight: "regular",
                    align: "end",
                    gravity: "center",
                    wrap: true,
                    size: "xxs",
                    color: "#000000",
                    text: `${numberToStringCurrency(otherIncome)}`,
                    style: "normal",
                    margin: "xxl"
                  }
                ],
                layout: "horizontal",
                spacing: "md",
                type: "box",
                margin: "md"
              },
              
              {
                layout: "horizontal",
                contents: [
                  {
                    wrap: true,
                    color: "#000000",
                    gravity: "center",
                    align: "start",
                    margin: "xxl",
                    text: "รวมรายได้",
                    style: "normal",
                    size: "xs",
                    contents: [],
                    type: "text",
                    weight: "bold"
                  },
                  {
                    type: "text",
                    align: "end",
                    wrap: true,
                    margin: "md",
                    contents: [],
                    color: "#000000",
                    text: `${numberToStringCurrency(totalIncome)}`,
                    gravity: "center",
                    weight: "bold",
                    size: "xxs"
                  }
                ],
                type: "box",
                spacing: "md",
                margin: "md"
              },
              {
                margin: "lg",
                weight: "regular",
                wrap: true,
                type: "text",
                style: "normal",
                gravity: "center",
                align: "start",
                contents: [],
                color: "#3B4ECC",
                size: "xs",
                text: "กดเพื่อดูรายได้อื่น ๆ เพิ่มเติม",
                action: {
                  text: "รายได้อื่น ๆ เพิ่มเติม",
                  type: "message",
                  label: "action"
                }
              }
            ]
          },
          {
            margin: "lg",
            color: "#C4C4C4",
            type: "separator"
          },
          {
            type: "box",
            contents: [
              {
                color: "#747474",
                size: "sm",
                gravity: "center",
                wrap: true,
                contents: [],
                style: "normal",
                align: "start",
                type: "text",
                weight: "regular",
                text: "รายละเอียดรวมรายการหัก",
                margin: "xl"
              },
              {
                layout: "horizontal",
                margin: "md",
                spacing: "md",
                type: "box",
                contents: [
                  {
                    contents: [],
                    text: "ประกันสังคม",
                    style: "normal",
                    gravity: "center",
                    align: "start",
                    margin: "lg",
                    type: "text",
                    wrap: true,
                    color: "#000000",
                    size: "xs",
                    weight: "regular"
                  },
                  {
                    type: "text",
                    size: "xxs",
                    color: "#000000",
                    contents: [],
                    align: "end",
                    text: `${numberToStringCurrency(social)}`,
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    gravity: "center",
                    weight: "regular"
                  }
                ]
              },
              {
                layout: "horizontal",
                margin: "md",
                spacing: "md",
                type: "box",
                contents: [
                  {
                    contents: [],
                    text: "รวมรายการหักอื่น ๆ",
                    style: "normal",
                    gravity: "center",
                    align: "start",
                    margin: "lg",
                    type: "text",
                    wrap: true,
                    color: "#000000",
                    size: "xs",
                    weight: "regular"
                  },
                  {
                    type: "text",
                    size: "xxs",
                    color: "#000000",
                    contents: [],
                    align: "end",
                    text: `${numberToStringCurrency(otherDeduct)}`,
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    gravity: "center",
                    weight: "regular"
                  }
                ]
              },
              {
                spacing: "md",
                layout: "horizontal",
                contents: [
                  {
                    size: "xs",
                    align: "start",
                    type: "text",
                    gravity: "center",
                    contents: [],
                    color: "#000000",
                    style: "normal",
                    weight: "bold",
                    wrap: true,
                    text: "รวมรายการหัก",
                    margin: "xxl"
                  },
                  {
                    size: "xxs",
                    gravity: "center",
                    contents: [],
                    text: `${numberToStringCurrency(totalDeduct)}`,
                    align: "end",
                    color: "#000000",
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    weight: "bold",
                    type: "text"
                  }
                ],
                type: "box",
                margin: "md"
              },
              {
                margin: "lg",
                weight: "regular",
                wrap: true,
                type: "text",
                style: "normal",
                gravity: "center",
                align: "start",
                contents: [],
                color: "#3B4ECC",
                size: "xs",
                text: "กดเพื่อดูรายการหักอื่น ๆ เพิ่มเติม",
                action: {
                  text: "รายการหักอื่น ๆ เพิ่มเติม",
                  type: "message",
                  label: "action"
                }
              }
            ],
            layout: "vertical"
           },
           {
             margin: "lg",
             type: "separator",
             color: "#C4C4C4"
           },
           {
            type: "box",
            contents: [
              {
                color: "#747474",
                size: "sm",
                gravity: "center",
                wrap: true,
                contents: [],
                style: "normal",
                align: "start",
                type: "text",
                weight: "regular",
                text: "รายละเอียดรวมรายการสรุปต่าง ๆ",
                margin: "xl"
              },
              {
                spacing: "md",
                layout: "horizontal",
                contents: [
                  {
                    size: "xs",
                    align: "start",
                    type: "text",
                    gravity: "center",
                    contents: [],
                    color: "#000000",
                    style: "normal",
                    weight: "bold",
                    wrap: true,
                    text: "รายได้สุทธิ",
                    margin: "xxl"
                  },
                  {
                    size: "xxs",
                    gravity: "center",
                    contents: [],
                    text: `${numberToStringCurrency(netIncome)}`,
                    align: "end",
                    color: "#000000",
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    weight: "bold",
                    type: "text"
                  }
                ],
                type: "box",
                margin: "md"
              }
            ],
            layout: "vertical"
           }
         ]
       }
    }
}

const msgDetailForRegister = {
  "type": "bubble",
  "size": "giga",
  "direction": "ltr",
  "header": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "ท่านกำลังลงทะเบียนระบบ Pay Slip โดยมีข้อกำหนดสำคัญควรทราบดังนี้",
        "color": "#FFFFFF",
        "style": "normal",
        "weight": "bold",
        "align": "center",
        "gravity": "center",
        "size": "md",
        "wrap": true
      }
    ],
    "spacing": "sm",
    "margin": "sm",
    "position": "relative"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "1. การลงทะเบียนของพนักงาน 1 คนจะได้เพียง 1 ID",
        "size": "sm",
        "weight": "regular",
        "style": "normal",
        "offsetTop": "sm",
        "wrap": true
      },
      {
        "type": "text",
        "text": "2. ห้ามเอา ID ของผู้อื่น หรือที่ไม่แน่ใจมาใช้งานลงทะเบียนโดยเด็ดขาด",
        "size": "sm",
        "weight": "regular",
        "style": "normal",
        "offsetTop": "sm",
        "wrap": true
      },
      {
        "type": "text",
        "text": "3. การแอบดูเงินเดือนของบุคคลอื่นถือเป็นความผิดร้ายแรงของบริษัท",
        "size": "sm",
        "weight": "regular",
        "style": "normal",
        "offsetTop": "sm",
        "wrap": true
      },
      {
        "type": "separator",
        "color": "#C4C4C4",
        "margin": "lg"
      }
    ],
    "spacing": "sm",
    "margin": "sm",
    "position": "relative"
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "วิธีการลงทะเบียน",
        "size": "md",
        "weight": "bold",
        "style": "normal",
        "offsetStart": "sm"
      },
      {
        "type": "text",
        "text": "1. ให้พิมพ์คำว่า รหัสบัตรประชาชน:ตามด้วยรหัสบัตรประชาชน ของตัวเอง เช่น รหัสบัตรประชาชน:1-1111-11111-11-1",
        "size": "sm",
        "weight": "regular",
        "style": "normal",
        "offsetStart": "lg",
        "offsetTop": "sm",
        "position": "relative",
        "margin": "md",
        "wrap": true,
        "offsetEnd": "lg"
      },
      {
        "type": "text",
        "text": "2. ให้พิมพ์คำว่า รหัสพนักงาน:ตามด้วยรหัสพนักงาน ของตัวเองโดยไม่มีเว้นวรรค เช่น รหัสพนักงาน:999999",
        "size": "sm",
        "weight": "regular",
        "style": "normal",
        "offsetStart": "lg",
        "offsetTop": "sm",
        "position": "relative",
        "margin": "md",
        "wrap": true,
        "offsetEnd": "lg"
      }
    ],
    "margin": "sm",
    "spacing": "sm",
    "position": "relative"
  },
  "styles": {
    "header": {
      "backgroundColor": "#1DB954",
      "separator": true,
      "separatorColor": "#C4C4C4"
    }
  }
}

const profileMessage = ([empCode, emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	idCard,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName]) => {
  //empCode, emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	idCard,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName		
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'IT system co.ltm',
          color: '#1DB446',
          size: 'md',
          weight: 'bold'
        },
        {
          type: 'text',
          text: `${positionName}`,
          weight: 'bold',
          size: 'xxl',
          margin: 'md'
        },
        {
          type: 'text',
          text: `คุณ${firstName} ${lastName}`,
          size: 'sm',
          color: '#555555',
          wrap: true,
          margin: 'sm'
        },
        {
          type: 'text',
          text: `วันที่จ้างงาน ${workStartDate}`,
          size: 'sm',
          color: '#555555',
          wrap: true,
          margin: 'sm'
        },
        {
          type: 'text',
          text: `รหัสพนักงาน ${empCode}`,
          size: 'sm',
          color: '#555555',
          wrap: true,
          margin: 'sm'
        },
        {
          type: 'text',
          text: `หมายเลขบัตรประชาชน ${idCard}`,
          size: 'sm',
          color: '#555555',
          wrap: true,
          margin: 'sm'
        },
        {
          type: 'text',
          text: `หมายเลขบัญชี ${bookNo}`,
          size: 'sm',
          color: '#555555',
          wrap: true,
          margin: 'sm'
        },
        {
          type: 'text',
          text: `ชื่อธนาคาร ${bankName}`,
          size: 'sm',
          color: '#555555',
          wrap: true,
          margin: 'sm'
        },
        {
          type: 'separator',
          margin: 'xxl'
        },
      ]
    },
    styles: {
      footer: {
        separator: true
      }
    }
  }
}

const monthMessage = ([empCode, emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	idCard,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName]) => {
  //console.log(monPay)
  return {
      type: "bubble",
      size: "mega",
      direction: "ltr",
      styles: {
        header: {
          backgroundColor: "#FAFAFAFF",
          separator: true,
          separatorColor: "#C4C4C4"
        },
        body: {
          separatorColor: "#C4C4C4",
          separator: true,
          backgroundColor: "#FAFAFAFF"
        },
        footer: {
          backgroundColor: "#FAFAFAFF"
        }
      },
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            contents: [],
            size: "md",
            weight: "bold",
            gravity: "center",
            text: `รายละเอียดเงินเดือน`,
            color: "#000000",
            align: "center"
          },
          {
            type: "text",
            contents: [],
            size: "md",
            weight: "regular",
            gravity: "center",
            text: `เดือน ${allMonth}`,
            color: "#000000",
            align: "center"
          },
          {
            type: "box",
            layout: "horizontal",
            spacing: "md",
            contents: [
              {
                contents: [],
                align: "start",
                text: "ชื่องวดที่จ่าย",
                type: "text",
                gravity: "center",
                size: "xs",
                weight: "regular",
                color: "#747474",
                wrap: true,
                margin: "md"
              },
              {
                margin: "md",
                wrap: true,
                align: "end",
                contents: [],
                color: "#747474",
                text: "งวดของวันที่",
                gravity: "center",
                type: "text",
                style: "normal",
                size: "xs",
                weight: "regular"
              }
            ],
            margin: "md"
          },
          {
            spacing: "md",
            margin: "md",
            type: "box",
            layout: "horizontal",
            contents: [
              {
                wrap: true,
                align: "start",
                weight: "regular",
                gravity: "center",
                text: `${namePay}`,
                size: "xs",
                margin: "xxl",
                style: "normal",
                color: "#000000",
                contents: [],
                type: "text"
              },
              {
                wrap: true,
                text: `${payDate}`,
                margin: "md",
                size: "xs",
                align: "end",
                type: "text",
                contents: [],
                color: "#000000",
                gravity: "center",
                weight: "regular"
              }
            ]
          }
        ]
      },
      body: {
        layout: "vertical",
        type: "box",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                weight: "regular",
                contents: [],
                type: "text",
                margin: "xs",
                size: "sm",
                color: "#747474",
                text: "รายละเอียดรายได้",
                align: "start",
                wrap: true,
                gravity: "center"
              },
              {
                contents: [
                  {
                    contents: [],
                    style: "normal",
                    margin: "lg",
                    align: "start",
                    type: "text",
                    color: "#000000",
                    wrap: true,
                    text: "เงินเดือน",
                    size: "xs",
                    gravity: "center",
                    weight: "regular"
                  },
                  {
                    type: "text",
                    text: `${numberToStringCurrency(salary)}`,
                    size: "xxs",
                    weight: "regular",
                    align: "end",
                    wrap: true,
                    contents: [],
                    margin: "md",
                    gravity: "center",
                    color: "#000000"
                  }
                ],
                layout: "horizontal",
                type: "box",
                spacing: "md",
                margin: "md"
              },
              {
                contents: [
                  {
                    margin: "lg",
                    weight: "regular",
                    wrap: true,
                    type: "text",
                    style: "normal",
                    gravity: "center",
                    align: "start",
                    contents: [],
                    color: "#000000",
                    size: "xs",
                    text: "รายได้อื่น ๆ"
                  },
                  {
                    contents: [],
                    type: "text",
                    weight: "regular",
                    align: "end",
                    gravity: "center",
                    wrap: true,
                    size: "xxs",
                    color: "#000000",
                    text: `${numberToStringCurrency(otherIncome)}`,
                    style: "normal",
                    margin: "xxl"
                  }
                ],
                layout: "horizontal",
                spacing: "md",
                type: "box",
                margin: "md"
              },
              
              {
                layout: "horizontal",
                contents: [
                  {
                    wrap: true,
                    color: "#000000",
                    gravity: "center",
                    align: "start",
                    margin: "xxl",
                    text: "รวมรายได้",
                    style: "normal",
                    size: "xs",
                    contents: [],
                    type: "text",
                    weight: "bold"
                  },
                  {
                    type: "text",
                    align: "end",
                    wrap: true,
                    margin: "md",
                    contents: [],
                    color: "#000000",
                    text: `${numberToStringCurrency(totalIncome)}`,
                    gravity: "center",
                    weight: "bold",
                    size: "xxs"
                  }
                ],
                type: "box",
                spacing: "md",
                margin: "md"
              },
              {
                margin: "lg",
                weight: "regular",
                wrap: true,
                type: "text",
                style: "normal",
                gravity: "center",
                align: "start",
                contents: [],
                color: "#3B4ECC",
                size: "xs",
                text: "กดเพื่อดูรายได้อื่น ๆ เพิ่มเติม",
                action: {
                  text: "รายได้อื่น ๆ เพิ่มเติม",
                  type: "message",
                  label: "action"
                }
              }
            ]
          },
          {
            margin: "lg",
            color: "#C4C4C4",
            type: "separator"
          },
          {
            type: "box",
            contents: [
              {
                color: "#747474",
                size: "sm",
                gravity: "center",
                wrap: true,
                contents: [],
                style: "normal",
                align: "start",
                type: "text",
                weight: "regular",
                text: "รายละเอียดรวมรายการหัก",
                margin: "xl"
              },
              {
                layout: "horizontal",
                margin: "md",
                spacing: "md",
                type: "box",
                contents: [
                  {
                    contents: [],
                    text: "ประกันสังคม",
                    style: "normal",
                    gravity: "center",
                    align: "start",
                    margin: "lg",
                    type: "text",
                    wrap: true,
                    color: "#000000",
                    size: "xs",
                    weight: "regular"
                  },
                  {
                    type: "text",
                    size: "xxs",
                    color: "#000000",
                    contents: [],
                    align: "end",
                    text: `${numberToStringCurrency(social)}`,
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    gravity: "center",
                    weight: "regular"
                  }
                ]
              },
              {
                layout: "horizontal",
                margin: "md",
                spacing: "md",
                type: "box",
                contents: [
                  {
                    contents: [],
                    text: "รวมรายการหักอื่น ๆ",
                    style: "normal",
                    gravity: "center",
                    align: "start",
                    margin: "lg",
                    type: "text",
                    wrap: true,
                    color: "#000000",
                    size: "xs",
                    weight: "regular"
                  },
                  {
                    type: "text",
                    size: "xxs",
                    color: "#000000",
                    contents: [],
                    align: "end",
                    text: `${numberToStringCurrency(otherDeduct)}`,
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    gravity: "center",
                    weight: "regular"
                  }
                ]
              },
              {
                spacing: "md",
                layout: "horizontal",
                contents: [
                  {
                    size: "xs",
                    align: "start",
                    type: "text",
                    gravity: "center",
                    contents: [],
                    color: "#000000",
                    style: "normal",
                    weight: "bold",
                    wrap: true,
                    text: "รวมรายการหัก",
                    margin: "xxl"
                  },
                  {
                    size: "xxs",
                    gravity: "center",
                    contents: [],
                    text: `${numberToStringCurrency(totalDeduct)}`,
                    align: "end",
                    color: "#000000",
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    weight: "bold",
                    type: "text"
                  }
                ],
                type: "box",
                margin: "md"
              },
              {
                margin: "lg",
                weight: "regular",
                wrap: true,
                type: "text",
                style: "normal",
                gravity: "center",
                align: "start",
                contents: [],
                color: "#3B4ECC",
                size: "xs",
                text: "กดเพื่อดูรายการหักอื่น ๆ เพิ่มเติม",
                action: {
                  text: "รายการหักอื่น ๆ เพิ่มเติม",
                  type: "message",
                  label: "action"
                }
              }
            ],
            layout: "vertical"
           },
           {
             margin: "lg",
             type: "separator",
             color: "#C4C4C4"
           },
           {
            type: "box",
            contents: [
              {
                color: "#747474",
                size: "sm",
                gravity: "center",
                wrap: true,
                contents: [],
                style: "normal",
                align: "start",
                type: "text",
                weight: "regular",
                text: "รายละเอียดรวมรายการสรุปต่าง ๆ",
                margin: "xl"
              },
              {
                spacing: "md",
                layout: "horizontal",
                contents: [
                  {
                    size: "xs",
                    align: "start",
                    type: "text",
                    gravity: "center",
                    contents: [],
                    color: "#000000",
                    style: "normal",
                    weight: "bold",
                    wrap: true,
                    text: "รายได้สุทธิ",
                    margin: "xxl"
                  },
                  {
                    size: "xxs",
                    gravity: "center",
                    contents: [],
                    text: `${numberToStringCurrency(netIncome)}`,
                    align: "end",
                    color: "#000000",
                    wrap: true,
                    style: "normal",
                    margin: "md",
                    weight: "bold",
                    type: "text"
                  }
                ],
                type: "box",
                margin: "md"
              }
            ],
            layout: "vertical"
           }
         ]
       }
    }
}

const meIncomeOther = ([,	,	,	,	,	,	,	accountName,	,	debit		]) => {
    //empCode,	namePrefix,	firstName,	lastName,	monPay,	payDate,	accountCode,	accountName,	isSpecialPeriod,	debit	
    console.log(accountName)
  return {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "รายละเอียดรายได้อื่น ๆ",
          weight: "bold",
          size: "xl",
          margin: "md"
        },
        {
          type: "separator",
          margin: "xxl"
        },
        {
          type: "box",
          layout: "vertical",
          margin: "xxl",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: `${accountName}`,
                  size: "md",
                  color: "#777777",
                  wrap: true
                },
                {
                  type: "text",
                  text: `${numberToStringCurrency(debit)} บาท`,
                  size: "md",
                  color: "#777777",
                  align: "end"
                },
              ]
            }
          ]
        }
      ]
    }
  }

}

const msgTest = {
  "type": "bubble",
  "size": "giga",
  "direction": "ltr",
  "header": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "กรุณาเลือกเดือนที่ต้องการดูข้อมูลย้อนหลัง",
        "size": "md",
        "style": "normal",
        "weight": "bold",
        "gravity": "center",
        "position": "relative",
        "align": "center",
        "wrap": true,
        "color": "#FFFFFF"
      }
    ],
    "position": "relative"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "box",
        "layout": "horizontal",
        "spacing": "xs",
        "contents": [
          
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ธ.ค.",
              "text": "ธันวาคม"
            },
            "style": "primary",
            "position": "relative"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ม.ค.",
              "text": "มกราคม"
            },
            "position": "relative",
            "style": "primary"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ก.พ.",
              "text": "กุมภาพันธ์"
            },
            "style": "primary",
            "position": "relative"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "spacing": "xs",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "มี.ค.",
              "text": "มีนาคม"
            },
            "style": "primary",
            "position": "relative"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "เม.ย.",
              "text": "เมษายน"
            },
            "style": "primary",
            "position": "relative"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "พ.ค.",
              "text": "พฤษภาคม"
            },
            "style": "primary",
            "position": "relative"
          }
        ]
      }
    ],
    "position": "relative"
  },
  "styles": {
    "header": {
      "backgroundColor": "#1DB954"
    }
  }
}

const text = (['text', 'text', 'text', 'text'])
const salaryOtherDebit = (data) => {

  const msg = {
    type: "bubble",
    size: "giga",
    header: {
        type: "box",
        layout: "horizontal",
        contents: [
            {
                type: "image",
                url: "https://bcrm-i.line-scdn.net/bcrm/uploads/1557539795/public_asset/file/1039/16041313597470536_logo.png",
                align: "start",
                size: "xxs",
                flex: 0,
                aspectRatio: "4:3"
            },
            {
                type: "text",
                text: data,
                color: "#ffffff",
                size: "xxs",
                align: "end",
                gravity: "center",
                position: "relative",
                weight: "regular"
            }
        ],
        paddingAll: "10px"
    },
    body: {
        type: "box",
        layout: "vertical",
        contents: [],
        backgroundColor: "#191414",
        spacing: "md"
    },
    styles: {
        header: {
            backgroundColor: "#1DB954"
        }
    }
                  
  }
  return msg
}

  module.exports = { salaryMessage, meIncomeOther, monthMessage, msgTest, msgDetailForRegister}

////////////////////////////////////////////////////////////////////////////////////////////////

/* return {
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "รายละเอียดรายได้อื่น ๆ",
        weight: "bold",
        size: "xl",
        margin: "md"
      },
      {
        type: "separator",
        margin: "xxl"
      },
      {
        type: "box",
        layout: "vertical",
        margin: "xxl",
        spacing: "sm",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: `${accountName}`,
                size: "md",
                color: "#777777",
                flex: 0
              },
              {
                type: "text",
                text: `${numberToStringCurrency(debit)} บาท`,
                size: "md",
                color: "#777777",
                align: "end"
              },
            ]
          }
        ]
      }
    ]
  }
} */


/* var data = {}
var userData = []

 for (var _i = 0; _i < hasEmployee.length; _i++) {
     var dataRow = hasEmployee[_i]
     var record = {}
     var super_array = [];
     record['empCode'] = dataRow[0]
     record['namePrefix'] = dataRow[1]
     record['firstName'] = dataRow[2]
     record['lastName'] = dataRow[3]
     record['monPay'] = dataRow[4]
     record['payDate'] = dataRow[5]
     record['accountName'] = dataRow[7]
     record['debit'] = dataRow[9]
     userData.push(record)
       // for (var j = 0; j < userData.push(record).length; j++) {
       //   var subRecord = userData.push(record)
       // }
   }

   data.user = userData
   //var result = JSON.stringify(data)
   console.log(data) */
