const { google, containeranalysis_v1alpha1 } = require('googleapis')
const sheets = google.sheets('v4')
const { googleSheetCredential} = require('../config')
const serviceAccount = require('../credential.json')

const getGoogleSheetDataSalary = async (range) => {
  const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'] // read and write sheets
  })

  const params = {
      auth: jwtClient,
      spreadsheetId: googleSheetCredential.SPREADSHEET_ID,
      range: `${range}`
  }

  let data = []
    try {
      data = (await sheets.spreadsheets.values.get(params)).data
      
      //console.log(data)
    } catch (err) {
      console.error(err.message)
    }

  return data
}

module.exports = { getGoogleSheetDataSalary}