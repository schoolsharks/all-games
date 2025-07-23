# Google Apps Script Integration Setup Guide

This guide will help you connect your WGBA Game Library to Google Sheets using Google Apps Script for dynamic data management.

## Prerequisites

1. A Google account
2. A Google Sheets document with your games data
3. Google Apps Script access

## Step 1: Prepare Your Google Sheet

### Sheet Structure

Your Google Sheet should have the following columns in **exactly this order**:

| Column A | Column B | Column C    | Column D   | Column E  | Column F       |
| -------- | -------- | ----------- | ---------- | --------- | -------------- |
| ID       | Name     | Player Link | Admin Link | Admin PIN | Admin Passcode |

### Example Data:

```
1	miras-homeownership	https://miras-homeownership.wgab.world/home	https://miras-homeownership.wgab.world/admin	1234	chess123
2	skill-quest	https://skillquest.wgab.world/	https://skillquest.wgab.world/admin	5678	quiz456
3	zero-to-hero	https://zerotohero.wgab.world/	https://zerotohero.wgab.world/admin	3456	memory321
```

### Important Notes:

- **Row 1** should contain headers (ID, Name, Player Link, Admin Link, Admin PIN, Admin Passcode)
- **Row 2 onwards** should contain your actual game data
- Make sure there are no empty rows between games
- The sheet name should be "Games" (default, but can be customized in the script)

## Step 2: Create Google Apps Script

### 2.1 Open Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Give your project a meaningful name (e.g., "WGBA Games API")

### 2.2 Add the Script Code

Replace the default `Code.gs` content with the following script:

```javascript
// Configuration
const SHEET_NAME = "Games"; // Change this if your sheet has a different name

function doGet(e) {
  try {
    const action = e.parameter.action;

    switch (action) {
      case "ping":
        return ContentService.createTextOutput(
          JSON.stringify({
            status: "success",
            message: "Apps Script is working!",
          })
        ).setMimeType(ContentService.MimeType.JSON);

      case "getGames":
        return getAllGames();

      case "getGame":
        const gameId = parseInt(e.parameter.id);
        return getGameById(gameId);

      default:
        return ContentService.createTextOutput(
          JSON.stringify({
            status: "error",
            message: "Invalid action. Use: ping, getGames, or getGame",
          })
        ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getAllGames() {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found`);
    }

    const data = sheet.getDataRange().getValues();

    // Skip header row and convert to objects
    const games = data
      .slice(1)
      .map((row) => {
        return {
          id: parseInt(row[0]) || 0,
          name: row[1] || "",
          playerLink: row[2] || "",
          adminLink: row[3] || "",
          adminPin: row[4] || "",
          adminPasscode: row[5] || "",
        };
      })
      .filter((game) => game.name.trim()); // Filter out empty rows

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        data: games,
        count: games.length,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getGameById(gameId) {
  try {
    if (!gameId || isNaN(gameId)) {
      throw new Error("Valid game ID is required");
    }

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found`);
    }

    const data = sheet.getDataRange().getValues();

    // Find the game by ID (skip header row)
    const gameRow = data.slice(1).find((row) => parseInt(row[0]) === gameId);

    if (!gameRow) {
      throw new Error(`Game with ID ${gameId} not found`);
    }

    const game = {
      id: parseInt(gameRow[0]) || 0,
      name: gameRow[1] || "",
      playerLink: gameRow[2] || "",
      adminLink: gameRow[3] || "",
      adminPin: gameRow[4] || "",
      adminPasscode: gameRow[5] || "",
    };

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        data: game,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2.3 Attach Your Google Sheet

1. In the Apps Script editor, click on "Resources" or the settings icon
2. Go to "Cloud Platform project"
3. Or simply ensure the script can access your spreadsheet by:
   - Opening your Google Sheet
   - Going to "Extensions" > "Apps Script"
   - This will create a script attached to your sheet

## Step 3: Deploy the Apps Script

### 3.1 Deploy as Web App

1. In the Apps Script editor, click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set the following configuration:
   - **Description**: "WGBA Games API" (or any description)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this makes it publicly accessible)
4. Click "Deploy"
5. **Copy the Web app URL** - you'll need this for your `.env` file

### 3.2 Authorize the Script

1. You may be prompted to authorize the script
2. Click "Authorize access"
3. Choose your Google account
4. Click "Allow" to grant permissions

## Step 4: Test Your Apps Script

### 4.1 Test the Ping Endpoint

Open this URL in your browser (replace YOUR_SCRIPT_URL with your actual URL):

```
YOUR_SCRIPT_URL?action=ping
```

You should see:

```json
{
  "status": "success",
  "message": "Apps Script is working!"
}
```

### 4.2 Test Getting All Games

```
YOUR_SCRIPT_URL?action=getGames
```

You should see your games data in JSON format.

## Step 5: Configure Your Application

### 5.1 Create .env file

In your project root, create a `.env` file:

```bash
# Copy from .env.example
cp .env.example .env
```

### 5.2 Add Your Apps Script URL

Edit the `.env` file and add your Apps Script URL:

```env
VITE_APPS_SCRIPT_URL=YOUR_SCRIPT_URL_HERE
```

**Replace `YOUR_SCRIPT_URL_HERE`** with the Web app URL from Step 3.1.

**Important:** The environment variable must be prefixed with `VITE_` to be accessible in the browser.

## Step 6: Test the Integration

1. Save your `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Open your application
4. You should see a "Refresh Games" button in the header
5. Check the browser console - it should show "Successfully fetched X games from Apps Script"

## Troubleshooting

### Common Issues:

#### 1. "Apps Script URL not configured"

- Check that your `.env` file exists and has the correct variable name: `VITE_APPS_SCRIPT_URL`
- Restart your development server after creating/updating `.env`

#### 2. "Failed to fetch data" or CORS errors

- Make sure your Apps Script is deployed with "Who has access" set to "Anyone"
- Ensure the URL is correct and accessible

#### 3. "Sheet not found" error

- Check that your sheet name matches the `SHEET_NAME` variable in the Apps Script
- Default is "Games" - update the script if your sheet has a different name

#### 4. Empty or incorrect data

- Verify your sheet structure matches the expected format
- Check that Row 1 contains headers and Row 2+ contains data
- Ensure there are no empty rows between games

#### 5. Authorization issues

- Re-run the authorization process in Apps Script
- Make sure the script has permission to access your spreadsheet

## API Endpoints

Your Apps Script will provide these endpoints:

- **Ping**: `?action=ping` - Test connection
- **Get All Games**: `?action=getGames` - Fetch all games
- **Get Specific Game**: `?action=getGame&id=1` - Fetch game by ID

## Security Notes

- The Apps Script is deployed publicly to work with your web application
- Consider adding additional security measures if needed
- Game admin pins and passcodes are transmitted as part of the API response
- Ensure your Google Sheet is properly secured

## Conditional Admin Button

The admin button will only be displayed for games that have an admin link configured. If a game's admin link is empty or missing from your Google Sheet, only the "Player" button will be shown.

### Google Sheet Configuration

In your Google Sheet:

- **Column D (Admin Link)**: If this cell is empty or contains only whitespace, no admin button will be shown
- **Column D (Admin Link)**: If this cell contains a valid URL, the admin button will be displayed

### Example in Google Sheet:

| ID  | Name   | Player Link | Admin Link  | Admin PIN | Admin Passcode |
| --- | ------ | ----------- | ----------- | --------- | -------------- |
| 1   | game-1 | https://... | https://... | 1234      | pass123        |
| 2   | game-2 | https://... |             | 5678      | pass456        |

In this example:

- **game-1** will show both Player and Admin buttons
- **game-2** will show only the Player button (no admin link provided)

## Updating Data

To update your games:

1. Edit your Google Sheet directly
2. Changes will be reflected immediately in your application
3. No need to redeploy the Apps Script unless you modify the script code
