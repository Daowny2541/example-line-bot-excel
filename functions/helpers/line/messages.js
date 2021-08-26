const numberToStringCurrency = (amount) => {
    return Intl.NumberFormat().format(amount)
}
const salaryMessage = ([idCard,	empCode,	emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName		]) => {
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
                    text: "กองทุนสำรองเลี้ยงชีพ",
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
                    align: "end",
                    text: `${numberToStringCurrency(providentFund)}`,
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
                    text: "จ่ายภาษี",
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
                    align: "end",
                    text: `${numberToStringCurrency(empPaytax)}`,
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
        "text": "การลงทะเบียน",
        "size": "md",
        "weight": "bold",
        "style": "normal",
        "offsetStart": "sm"
      },
      {
        "type": "text",
        "text": "พิมพ์ ID1(ตัวพิมพ์ใหญ่เท่านั้น)@รหัสบัตรประชาชน โดยไม่ต้องเว้นวรรคหรือใส่เครื่องหมายขีด\nตัวอย่าง ID1@1111111111111",
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

const monthMessage = ([idCard,	empCode,	emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName]) => {
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
                    text: "กองทุนสำรองเลี้ยงชีพ",
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
                    align: "end",
                    text: `${numberToStringCurrency(providentFund)}`,
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
                    text: "จ่ายภาษี",
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
                    align: "end",
                    text: `${numberToStringCurrency(empPaytax)}`,
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
	
const meIncomeOther = (data) => {
    //empCode,	namePrefix,	firstName,	lastName,	monPay,	payDate,	accountCode,	accountName,	isSpecialPeriod,	debit	

  return {
    type: "bubble",
    size: "mega",
    direction: "ltr",
    styles: {
      header: {
        backgroundColor: "#1DB954",
        separator: true,
        separatorColor: "#C4C4C4"
      },
      body: {
        separatorColor: "#C4C4C4",
        separator: true,
        backgroundColor: "#FAFAFAFF"
      }
    },
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "รายละเอียดรายได้อื่น ๆ",
          weight: "bold",
          size: "md",
          color: "#ffffff"
        }
      ]
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `${data}`,
          size: "sm",
          color: "#777777",
          wrap: true
        }
      ]
    }
  }

}

const meDeductOther = (data) => {

return {
  type: "bubble",
  size: "mega",
  direction: "ltr",
  styles: {
    header: {
      backgroundColor: "#1DB954",
      separator: true,
      separatorColor: "#C4C4C4"
    },
    body: {
      separatorColor: "#C4C4C4",
      separator: true,
      backgroundColor: "#FAFAFAFF"
    }
  },
  header: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "รายละเอียดรายการหักอื่น ๆ",
        weight: "bold",
        size: "md",
        color: "#ffffff"
      }
    ]
  },
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: `${data}`,
        size: "sm",
        color: "#777777",
        wrap: true
      }
    ]
  }
}

}

const msgBtnMonth= {
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
              "label": "ม.ค.",
              "text": "กด มกราคม"
            },
            "style": "primary",
            "position": "relative"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ก.พ.",
              "text": "กด กุมภาพันธ์"
            },
            "position": "relative",
            "style": "primary"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "มี.ค.",
              "text": "กด มีนาคม"
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
              "label": "เม.ย.",
              "text": "กด เมษายน"
            },
            "style": "primary",
            "position": "relative"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "พ.ค.",
              "text": "กด พฤษภาคม"
            },
            "style": "primary",
            "position": "relative"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "มิ.ย.",
              "text": "กด มิถุนายน"
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

  module.exports = { salaryMessage, meIncomeOther, meDeductOther, monthMessage, msgBtnMonth, msgDetailForRegister}

