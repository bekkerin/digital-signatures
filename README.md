# Digital Signatures
## Creating digital signatures with Google Script attached to documents

Google Script is a JavaScript-like language built into all Gmail accounts, including all educational Gmail accounts. Script projects have one or more script files which can either be code files or HTML files. Pure JavaScript and CSS can be included in the HTML files. Scripts can be used as a stand-alone scripts or attached to Google files like Google Docs, Google Sheets, and Google Slides. More information can be be found at [Google Apps Scripts](https://developers.google.com/apps-script).

Since the scripts can only be used when logged in to a Gmail account, the Gmail account uses the Gmail address as identity, and passwords are needed to access the accounts, the Gmail address can serve for digital signatures. 

**Digital signatures require:**
1. Intent to sign and opt-out clause 
2. Consent to do business electronically
4. Clear signature attribution
5. Association of signature with the record
1. Record retention

The following code replaces a signature placeholder in a document with an encoded email address plus date signed, and records the email / date / encoding in a signature spreadsheet.

```
function signDigitally()
{
    var userName = Session.getActiveUser().getEmail(); // getUserLoginID is deprecated
    var timeZone = Session.getScriptTimeZone();
    var now = Utilities.formatDate(new Date(), timeZone, "MM-dd-yyyy HH:mm:ss");
    var input = userName + now; //(#3)
    var digest = Utilities.base64Encode(input); 
    message = userName + ' - ' + now + ' - ' + digest;
    //sign the document
    var myDoc = DocumentApp.getActiveDocument();
    var myBody = myDoc.getBody();
    // in document above placeholder: "Please sign by clicking the Sign button or decline by clicking the Decline button" //(#1)
    // when button is clicked: "Are you sure? You consent to signing this document electronically" - Yes / No //(#2)
    myBody.replaceText("{SIGNATURE GOES HERE}",message); //(#4)
    //add the signature to the spreadsheet
  var ss = SpreadsheetApp.openById('GOOGLE_ID_OF_SPREADSHEET_WITH SIGNATURES');
  var sheet = ss.getSheetByName('signatures');
  var range = sheet.getDataRange();
  var values = range.getValues();
  var lastRow = range.getLastRow();
  sheet.getRange(lastRow+1,1).setValue(userName); 
  sheet.getRange(lastRow+1,2).setValue(now);
  sheet.getRange(lastRow+1,3).setValue(digest); //(#5)
}
```

Task List
- [ ] create user instructions
- [ ] create demonstration video
