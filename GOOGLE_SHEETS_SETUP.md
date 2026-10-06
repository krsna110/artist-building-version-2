# 📊 Google Sheets Form Integration Guide

This guide allows your website form (both **Course Registration** and **Brochure Downloads**) to automatically send student leads directly into a **Google Sheet** in real-time with **zero hosting cost** and **unlimited submissions**.

---

## 🚀 Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name it something like: `Artist Building - Student Leads`.
3. *(Optional)* Name the first tab at the bottom `Leads` (or leave it as default `Sheet1`).

---

## ⚡ Step 2: Add Google Apps Script

1. In your Google Sheet menu bar, click **Extensions** > **Apps Script**.
2. Delete whatever code is inside `Code.gs` and paste the following complete script:

```javascript
/**
 * Google Apps Script for Artist Building Academy
 * Receives form submissions from the website and appends them to Google Sheets
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming JSON data
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // Auto-create Header Row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Submission Type",
        "Full Name",
        "WhatsApp / Phone",
        "City",
        "Current Status",
        "Editing Level",
        "Goal / Reason",
        "Joining Timeline",
        "Course Name"
      ];
      sheet.appendRow(headers);
      
      // Style Header Row (Bold + Dark Blue background + Gold text)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1A1728");
      headerRange.setFontColor("#F4B942");
      sheet.setFrozenRows(1);
    }
    
    // Format timestamp nicely
    var formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    
    var submissionType = data.intent === "brochure" ? "Brochure Download" : "Course Registration";
    
    // Prepare row data
    var newRow = [
      formattedDate,
      submissionType,
      data.fullName || "",
      data.phone || "",
      data.city || "",
      data.currentStatus || "",
      data.editingLevel || "",
      data.learningReason || "",
      data.joiningTimeline || "",
      data.course || "Advanced Video Editing Course"
    ];
    
    // Append to Sheet
    sheet.appendRow(newRow);
    
    // Return Success Response
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Lead saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Press **Ctrl + S** (or click the Save icon 💾) to save the script.

---

## 🌐 Step 3: Deploy as a Web App

1. In the top right corner of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Website Form Webhook`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(⚠️ Important: Must be set to "Anyone" so visitors can submit)*
4. Click **Deploy**.
5. If prompted with *"Authorize Access"*:
   - Click **Authorize access**.
   - Select your Google account.
   - Click **Advanced** (bottom left) > **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Google will give you a **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`).
7. **Copy this URL**.

---

## 🔗 Step 4: Paste the URL in Your Website Code

1. Open `register-modal.js`.
2. At the top (line 11), find:
   ```javascript
   const GOOGLE_SHEET_WEBAPP_URL = '';
   ```
3. Paste your Web App URL between the quotes:
   ```javascript
   const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Save the file. That's it!

---

## ✅ What Happens When a Visitor Submits?

- **Real-Time Data**: The visitor's Name, Phone, City, Status, Editing Level, Reason, Timeline, and Submission Type (*Course Registration* or *Brochure Download*) appear instantly as a new row in your Google Sheet.
- **Brochure Downloaders**: Trigger automatic PDF download and get recorded as `Brochure Download` in your sheet.
- **Offline Backup**: Form submissions are also safely backed up to the browser's `localStorage` in case the user's internet is unstable.
