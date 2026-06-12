/**
 * 小布的秘密物語 - Google Apps Script 後端
 * 
 * 使用方式：
 * 1. 建立 Google Sheet
 * 2. 擴充功能 → Apps Script
 * 3. 貼上這段程式碼
 * 4. 部署 → 新增部署作業 → 類型：Web 應用程式
 * 5. 執行身份：ME / 存取權限：任何人
 * 6. 複製 Web App URL
 */

// 設定試算表名稱（改成你的實際名稱）
const SHEET_NAME = '工作表1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }
    
    // 解析 POST 資料
    const payload = JSON.parse(e.postData.contents);
    const choice = payload.choice || '';
    const episode = payload.episode || '';
    const timestamp = new Date().toISOString();
    
    // 寫入試算表
    sheet.appendRow([timestamp, episode, choice]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', choice: choice}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 測試用：手動寫入
function testWrite() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date().toISOString(), 'test-episode', 'C']);
}
