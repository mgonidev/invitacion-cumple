/**
 * RSVP endpoint for Google Sheets.
 * 1. Open the destination Sheet, then Extensions > Apps Script.
 * 2. Paste this file and save it.
 * 3. Deploy > New deployment > Web app. Execute as: Me. Access: Anyone.
 * 4. Copy the /exec URL into VITE_RSVP_ENDPOINT in the frontend .env.local.
 *
 * This script writes to the RSVP tab in "Invitaciones".
 * It can therefore be deployed from a standalone Apps Script project as well.
 */
const SPREADSHEET_ID = '1fp4gBBencE-7ETRcBN5D0KNcsSA5EAxf5cusHq3UZsk';
const RSVP_SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) throw new Error('No se recibió un cuerpo JSON.');
    const data = JSON.parse(e.postData.contents);
    if (!data.name || typeof data.name !== 'string') throw new Error('El nombre es obligatorio.');
    if (typeof data.attending !== 'boolean') throw new Error('El campo asiste no es válido.');

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(RSVP_SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Nombre', 'De parte de quién viene', 'Asiste']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(), data.name.trim(), data.comingFrom || '', data.attending ? 'Sí' : 'No',
    ]);
    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: error instanceof Error ? error.message : String(error) });
  }
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
