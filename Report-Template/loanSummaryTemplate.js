import moment from "moment";

const generateTemplate = (data) => {
  const { customerName, customerCode, loans, payments } = data;

  const loanRows = loans.map((loan, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${loan.loanName}</td>
      <td>${moment(loan.date).format("YYYY-MM-DD")}</td>
      <td style="text-align: right;">${Number(loan.amount).toFixed(2)}</td>
    </tr>`).join("");

  const paymentRows = payments.map((pay, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${moment(pay.date).format("YYYY-MM-DD")}</td>
      <td style="text-align: right;">${Number(pay.amount).toFixed(2)}</td>
    </tr>`).join("");

  const totalLoan = loans.reduce((acc, item) => acc + (item.amount || 0), 0);
  const totalPaid = payments.reduce((acc, item) => acc + (item.amount || 0), 0);
  const remaining = totalLoan - totalPaid;

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #ccc;
          margin-bottom: 20px;
          padding-bottom: 10px;
        }
        .logo {
          height: 50px;
        }
        .right { text-align: right; }
        .highlight { color: #d32f2f; font-weight: bold; }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          margin-top: 10px;
        }
        th {
          border: 1px solid #ccc;
          background-color: #e3f2fd;
          padding: 8px;
          text-align: left;
        }
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        tfoot td {
          background-color: #f0f0f0;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <header>
        <div style="font-size:18px;font-weight:600;">Hasindu Book Shop & Grocery</div>
        <div style="text-align:right">
          <div style="font-size:18px;font-weight:600;">Loan Summary Report</div>
          <div style="font-size:12px;">Generated Date: ${moment().format("YYYY-MM-DD")}</div>
        </div>
      </header>

      <h3>${customerName} (${customerCode})</h3>

      <h4>Loans</h4>
      <table>
        <thead>
          <tr><th>#</th><th>Loan Name</th><th>Date</th><th>Amount</th></tr>
        </thead>
        <tbody>${loanRows}</tbody>
        <tfoot>
          <tr><td colspan="3">Total Loan</td><td class="right">${totalLoan.toFixed(2)}</td></tr>
        </tfoot>
      </table>

      <h4>Payments</h4>
      <table>
        <thead><tr><th>#</th><th>Date</th><th>Amount</th></tr></thead>
        <tbody>${paymentRows}</tbody>
        <tfoot>
          <tr><td colspan="2">Total Paid</td><td class="right">${totalPaid.toFixed(2)}</td></tr>
          <tr><td colspan="2">Remaining</td><td class="right highlight">${remaining.toFixed(2)}</td></tr>
        </tfoot>
      </table>
    </body>
  </html>`;
};

export default generateTemplate;
