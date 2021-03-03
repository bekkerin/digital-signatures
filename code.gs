function signDigitally()
{
    var userName = Session.getActiveUser().getEmail(); // getUserLoginID is deprecated
    var timeZone = Session.getScriptTimeZone();
    var now = Utilities.formatDate(new Date(), timeZone, "MM-dd-yyyy HH:mm:ss");
    var input = userName + now; //(#3)
    var digest = Utilities.base64Encode(input); 
    message = userName + ' - ' + now + ' - ' + digest;
    //sign the document
    var myDoc = DocumentApp.getActiveDocument();
    var myBody = myDoc.getBody();
    // in document above placeholder: "Please sign by clicking the Sign button or decline by clicking the Decline button" (#1)
    // when button is clicked: "Are you sure? You consent to signing this document electronically" - Yes / No //(#2)
    myBody.replaceText("{SIGNATURE GOES HERE}",message); //(#4)
    //add the signature to the spreadsheet
  var ss = SpreadsheetApp.openById('GOOGLE_ID_OF_SPREADSHEET_WITH SIGNATURES');
  var sheet = ss.getSheetByName('signatures');
  var range = sheet.getDataRange();
  var values = range.getValues();
  var lastRow = range.getLastRow();
  sheet.getRange(lastRow+1,1).setValue(userName); 
  sheet.getRange(lastRow+1,2).setValue(now);
  sheet.getRange(lastRow+1,3).setValue(digest);  //(#5)
}
