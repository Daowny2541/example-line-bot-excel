const lineCredential = {
    USER_ID: 'U1724cb3b8cf729059c868cd39f24d87f',
    CHANNEL_SECRET: 'e865af0d739f08fb1e59f18e84f6d063',
    ACCESS_TOKEN: 'HTXYuI/Y/IOUhm2vVLsa+cHrG50+Ys9ScMyps7t1CJxEyKFDxx16KXzdh6UuuaZMBMvehUQnIj9pHGZtonxCZ5i+fI76H/8oyMLXYRxeDrN2z9XgDCWXIfQ1rxDAtWDH0Pou6VOxWgCSxVcopD/qrwdB04t89/1O/w1cDnyilFU='
  }

  const googleSheetCredential = {
    SPREADSHEET_ID: '1h7YLzMGX8_RJFEn4nlN6bwkHGC7eGY8wp-l1DlnS5sA', 
    RANGE_SHEET1: 'salary2021!A2:AJ',
    RANGE_SHEET2: `SalaryDebit2021!A2:M`,
    RANGE_SHEET3: `SalaryCredit2021!A2:M`
  }

  const firebaseCredential = {
    DATABASE_URL: 'https://botslipexcel-default-rtdb.firebaseio.com'
  }

  module.exports = {
    lineCredential,
    googleSheetCredential,
    firebaseCredential
  }