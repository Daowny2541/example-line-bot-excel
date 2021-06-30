const testMessage = ([empCode, emplGrupName,	orgUnitName,	orgCode,	orgName,	orgNameEng,	isSpecialPeriod,	monThis,	monPay,	title,	firstName,	lastName,	idCard,	birthDate,	workStartDate,	allMonth,	namePay,	periodYear,	periodno,	payDate,	salary,	netIncome,	totalIncome,	totalDeduct,	social,	providentFund,	empPaytax,	otherIncome,	otherDeduct,	emplGrupCode,	branchNo,	providentFundEmployer,	tax401,	positionName,	bookNo,	bankName]) => {
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
module.exports = {testMessage}