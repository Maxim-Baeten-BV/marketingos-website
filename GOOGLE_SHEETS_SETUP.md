# Google Sheets Waitlist Setup Guide

Your spreadsheet: https://docs.google.com/spreadsheets/d/1P_zhxVZWo00Td9Zv0N_RN-zCz_6gAFkqOuFXgtiGMro/edit

## Step 1: Open the Apps Script Editor

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. This opens the script editor in a new tab

## Step 2: Add the Script

1. Delete any existing code in the editor
2. Copy and paste the entire code below:

```javascript
const SHEET_NAME = 'Waitlist';
const NOTIFICATION_EMAIL = 'hallo@maximbaeten.be';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = data.email;

    if (!email || !isValidEmail(email)) {
      return createResponse({ error: 'Invalid email address' }, 400);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange('A1:C1').setValues([['Email', 'Timestamp', 'Source']]);
      sheet.getRange('A1:C1').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Check for duplicate email
    const emails = sheet.getRange('A:A').getValues().flat().map(e => e.toString().toLowerCase());
    if (emails.includes(email.toLowerCase())) {
      return createResponse({ error: 'Already on waitlist', alreadyExists: true }, 409);
    }

    // Add entry
    const timestamp = new Date().toLocaleString('en-BE', { timeZone: 'Europe/Brussels' });
    const source = data.source || 'website';
    sheet.appendRow([email, timestamp, source]);

    const position = sheet.getLastRow() - 1;

    // Send email notification
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: '🎉 New Waitlist Signup: ' + email,
      htmlBody: '<div style="font-family:Arial,sans-serif;max-width:600px">' +
        '<h2 style="color:#2563eb">New Waitlist Signup!</h2>' +
        '<p>Someone just joined the MarketingOS waitlist:</p>' +
        '<div style="background:#f3f4f6;padding:16px;border-radius:8px;margin:16px 0">' +
        '<p style="margin:0"><strong>Email:</strong> ' + email + '</p>' +
        '<p style="margin:8px 0 0"><strong>Time:</strong> ' + timestamp + '</p>' +
        '<p style="margin:8px 0 0"><strong>Position:</strong> #' + position + '</p>' +
        '</div></div>'
    });

    return createResponse({ success: true, position: position }, 200);

  } catch (error) {
    console.error('Error:', error);
    return createResponse({ error: 'An error occurred' }, 500);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**
3. Configure:
   - **Description**: "Waitlist API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Click **Authorize access** → follow prompts
   - If you see "Google hasn't verified this app", click **Advanced** → **Go to [project name] (unsafe)** → **Allow**
6. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/AKfycb.../exec`)

## Step 4: Update Your Website

Open `src/main.js` and replace line 7:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
```

## Step 5: Deploy & Test

1. Commit and push to deploy on Vercel
2. Click "Get on the waitlist" on your site
3. Enter a test email
4. Check your Google Sheet - you should see the new entry!

## Troubleshooting

- **Nothing happens**: Check browser console for errors
- **CORS errors**: Make sure "Who has access" is set to "Anyone"
- **No data in sheet**: Check **Executions** in Apps Script editor for error logs
