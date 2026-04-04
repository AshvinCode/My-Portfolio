// Google Apps Script for Portfolio Analytics & Contact Form
// Setup Instructions:
// 1. Go to https://script.google.com
// 2. Create new project
// 3. Replace all code with this script
// 4. Deploy as Web App (Execute as: Me, Access as: Anyone)
// 5. Copy deployment URL to your portfolio's script.js

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = props.getProperty('SPREADSHEET_ID');
  let ss;
  
  if (!spreadsheetId) {
    ss = SpreadsheetApp.create('Portfolio Tracking & Submissions');
    spreadsheetId = ss.getId();
    props.setProperty('SPREADSHEET_ID', spreadsheetId);
  } else {
    try {
      ss = SpreadsheetApp.openById(spreadsheetId);
    } catch(e) {
      ss = SpreadsheetApp.create('Portfolio Tracking & Submissions');
      spreadsheetId = ss.getId();
      props.setProperty('SPREADSHEET_ID', spreadsheetId);
    }
  }
  
  // Setup standard sheets if they don't exist
  setupSheet(ss, 'Contacts', ['Timestamp', 'Name', 'Email', 'Message', 'User Agent']);
  setupSheet(ss, 'Visits', ['Timestamp', 'URL Path', 'Host', 'User Agent']);
  setupSheet(ss, 'Clicks', ['Timestamp', 'Element Tag', 'Element Text / Info', 'User Agent']);
  
  return ss;
}

function setupSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    // If it's the very first time and Sheet1 exists, use it
    if (ss.getSheets().length === 1 && ss.getSheets()[0].getName() === 'Sheet1') {
      sheet = ss.getSheets()[0];
      sheet.setName(sheetName);
    } else {
      sheet = ss.insertSheet(sheetName);
    }
    
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#00d4ff');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'unknown';
    
    const ss = getOrCreateSpreadsheet();
    const timestamp = new Date();
    const userAgent = data.userAgent || 'Unknown';

    if (action === 'contact') {
      const sheet = ss.getSheetByName('Contacts');
      sheet.appendRow([timestamp, data.name, data.email, data.message, userAgent]);
      sendConfirmationEmail(data.name, data.email);
      sendOwnerNotification(data);
      return createJsonResponse(true, 'Form submitted successfully');
    } 
    else if (action === 'visit') {
      const sheet = ss.getSheetByName('Visits');
      sheet.appendRow([timestamp, data.path, data.host, userAgent]);
      return createJsonResponse(true, 'Visit logged');
    }
    else if (action === 'click') {
      const sheet = ss.getSheetByName('Clicks');
      sheet.appendRow([timestamp, data.elementTag, data.elementData, userAgent]);
      return createJsonResponse(true, 'Click logged');
    }
    
    return createJsonResponse(false, 'Unknown Action requested');
  } catch(error) {
    return createJsonResponse(false, 'Server Error: ' + error.message);
  }
}

// Allow cross-origin requests
function doOptions(e) {
  return createJsonResponse(true, 'CORS Preflight Executed');
}

function createJsonResponse(success, message, data = {}) {
  const result = { success, message, data };
  return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(name, email) {
  try {
    const subject = 'Thanks for reaching out! 🙌';
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00d4ff, #7c3aed); padding: 20px; border-radius: 5px; color: white; text-align: center; }
          .content { padding: 20px; background: #f5f5f5; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thanks for reaching out, ${escapeHtml(name)}! 👋</h1>
          </div>
          <div class="content">
            <p>I received your message and will review it shortly. I greatly appreciate your interest!</p>
            <p>If your inquiry is urgent, feel free to reach out via LinkedIn.</p>
            <p>Best regards,<br>
            <strong>Ashvin Mori</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;
    GmailApp.sendEmail(email, subject, '', { htmlBody: htmlBody });
  } catch (e) {}
}

function sendOwnerNotification(data) {
  try {
    const ownerEmail = 'moriashvin892001@gmail.com';
    const subject = '📧 New Portfolio Contact Form Submission from ' + data.name;
    const htmlBody = `
      You received a new contact submission on your portfolio.<br/><br/>
      <b>Name:</b> ${escapeHtml(data.name)}<br/>
      <b>Email:</b> ${escapeHtml(data.email)}<br/>
      <b>Message:</b> ${escapeHtml(data.message)}<br/>
    `;
    GmailApp.sendEmail(ownerEmail, subject, '', { htmlBody: htmlBody });
  } catch (e) {}
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>"']/g, function(m) {
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'}[m];
  });
}
