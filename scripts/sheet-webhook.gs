/**
 * Google Apps Script — receives enquiries from the site and appends them to the
 * lead sheet. This file is not bundled with the app; it lives in the repo so the
 * deployed script is reviewable alongside the code that calls it.
 *
 * Setup (once):
 *   1. Open the sheet → Extensions → Apps Script, and paste this file in.
 *   2. Project Settings → Script properties → add `TOKEN` with a long random
 *      string. The same value goes in Vercel as SHEETS_WEBHOOK_TOKEN.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      "Anyone" is what lets the site's server reach it; the TOKEN check below
 *      is what keeps everyone else out.
 *   4. Copy the deployment's /exec URL into Vercel as SHEETS_WEBHOOK_URL.
 *
 * Re-deploy (Deploy → Manage deployments → edit → new version) after any edit,
 * otherwise the live URL keeps serving the previous code.
 */

var SHEET_ID = '1L3nAuicfnMMdJl3-BjUln6VPvFXUTqQpV042rNcK2p8';
var SHEET_NAME = 'Leads';

var HEADERS = [
  'Submitted at',
  'Reference',
  'Name',
  'Mobile',
  'City',
  'Loan type',
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    var expected = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (expected && body.token !== expected) {
      return json({ error: 'Unauthorized' });
    }

    var sheet = getSheet();
    sheet.appendRow([
      // Written as a real timestamp so the column sorts and filters by date.
      body.submittedAt ? new Date(body.submittedAt) : new Date(),
      body.reference || '',
      body.name || '',
      // Leading apostrophe keeps Sheets from trimming a leading zero.
      "'" + (body.phone || ''),
      body.city || '',
      body.product || '',
    ]);

    return json({ ok: true });
  } catch (error) {
    return json({ error: String(error) });
  }
}

function getSheet() {
  var book = SpreadsheetApp.openById(SHEET_ID);
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
