import Loan from '../models/loanSummary.js';
import Payment from '../models/loanPayment.js';
import generateTemplate from '../Report-Template/loanSummaryTemplate.js';
import puppeteer from 'puppeteer';

export const generateLoanSummaryPdf = async (req, res) => {
  try {
    const { customerCode, customerName } = req.query;

    if (!customerCode || !customerName) {
      return res.status(400).json({ message: 'Missing customerCode or customerName' });
    }

    const loans = await Loan.find({ customerCode });
    const payments = await Payment.find({ customerCode });

    const htmlContent = generateTemplate({ customerCode, customerName, loans, payments });

    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Loan_Summary_${customerCode}.pdf"`
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Error generating PDF', error: error.message });
  }
};
