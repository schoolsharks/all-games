# Troubleshooting: "Sheet 'Games' not found" Error

## The Issue

You're getting the error `Sheet "Games" not found` which means your Google Apps Script is working correctly, but it can't find a sheet named "Games" in your Google Sheets document.

## How to Fix This

### Step 1: Check Your Sheet Name

1. Open your Google Sheets document
2. Look at the bottom of the page where the sheet tabs are located
3. Check if your sheet is named exactly "Games" (case-sensitive)

Common issues:

- Sheet might be named "Sheet1" (the default)
- Sheet might be named "games" (lowercase)
- Sheet might have extra spaces like " Games " or "Games "

### Step 2: Rename Your Sheet (if needed)

If your sheet has a different name:

1. Right-click on the sheet tab at the bottom
2. Select "Rename"
3. Change it to exactly "Games" (capital G)
4. Press Enter to save

### Step 3: Update Your Apps Script (Alternative Solution)

Instead of renaming your sheet, you can update your Apps Script to match your actual sheet name:

1. Go to your Google Apps Script project
2. Find this line near the top:
   ```javascript
   const SHEET_NAME = "Games";
   ```
3. Change 'Games' to match your actual sheet name (keep the quotes)
4. Click "Save" (Ctrl+S or Cmd+S)
5. Deploy again: Click "Deploy" > "Manage deployments" > Click the edit icon > "Deploy"

### Step 4: Verify Your Sheet Structure

Make sure your sheet has the correct structure:

**Row 1 (Headers):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| ID | Name | Player Link | Admin Link | Admin PIN | Admin Passcode |

**Row 2+ (Data):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| 1 | miras-homeownership | https://... | https://... | 1234 | chess123 |
| 2 | skill-quest | https://... | https://... | 5678 | quiz456 |

### Step 5: Test the Fix

After making changes:

1. Go back to your WGBA app
2. Click the red "Debug" button (next to Refresh Games)
3. Open your browser console (F12 > Console tab)
4. Look for debug messages that will tell you exactly what's happening

### Step 6: Common Solutions

#### Solution A: Your sheet is named something else

- Rename your sheet to "Games" (Step 2 above)

#### Solution B: Keep your current sheet name

- Update the Apps Script SHEET_NAME variable (Step 3 above)

#### Solution C: Multiple sheets in your document

- Make sure you're putting the data in the correct sheet
- The Apps Script looks for the sheet named in SHEET_NAME variable

#### Solution D: Permissions issue

- Make sure your Apps Script has permission to access the spreadsheet
- Try running the script manually in Apps Script editor first

### Debug Button Usage

The red "Debug" button in your app will show you:

- ✅ If Apps Script connection is working
- 📊 Detailed error messages
- 💡 Specific suggestions for your situation

Look for these messages in the console:

- "Ping successful" = Apps Script is working
- "Sheet not found" = Name mismatch issue
- "No data" = Empty or wrong structure

### Still Not Working?

If you're still having issues:

1. Share your Google Sheet settings (make sure it's shared properly)
2. Double-check the Apps Script deployment URL
3. Verify the Apps Script code matches the provided template
4. Make sure your .env file has the correct VITE_APPS_SCRIPT_URL

### Quick Test

Try this URL in your browser (replace with your actual Apps Script URL):

```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=ping
```

You should see:

```json
{ "status": "success", "message": "Apps Script is working!" }
```

If that works, the issue is definitely with the sheet name or structure.
