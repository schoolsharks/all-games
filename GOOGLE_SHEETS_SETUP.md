# Google Sheets Integration Setup Guide

This guide will help you connect your WGBA Game Library to Google Sheets for dynamic data management.

## Prerequisites

1. A Google account
2. A Google Sheets document with your games data
3. Google Cloud Console access

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
- The sheet name should be "Games" (or you can customize it in environment variables)

## Step 2: Set Up Google Cloud Project

### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Note down your project ID

### 2.2 Enable Google Sheets API

1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 2.3 Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Click "Restrict Key" to limit it to Google Sheets API only

## Step 3: Make Your Google Sheet Public

### Option A: Share with Anyone (Easiest)

1. Open your Google Sheet
2. Click the "Share" button (top right)
3. Click "Change to anyone with the link"
4. Set permission to "Viewer"
5. Copy the share link

### Option B: Publish to Web

1. In your Google Sheet, go to File > Share > Publish to web
2. Choose "Entire Document" and "Web page"
3. Click "Publish"

## Step 4: Get Your Sheet ID

From your Google Sheets URL, extract the Sheet ID:

```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit#gid=0
```

For example, if your URL is:

```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
```

Your Sheet ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 5: Configure Environment Variables

### 5.1 Create .env file

In your project root, create a `.env` file:

```bash
# Copy from .env.example
cp .env.example .env
```

### 5.2 Add Your Credentials

Edit the `.env` file and add your credentials:

```env
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_SHEET_NAME=Games
```

**Important:** All environment variables must be prefixed with `VITE_` to be accessible in the browser.

**Replace:**

- `your_sheet_id_here` with your actual Sheet ID from Step 4
- `your_api_key_here` with your API key from Step 2.3
- `Games` with your sheet tab name (if different)

## Step 6: Test the Integration

1. Save your `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Open your application
4. You should see a "Refresh Games" button in the header
5. Check the browser console for any error messages

## Troubleshooting

### Common Issues:

#### 1. "Google Sheets credentials not configured"

- Check that your `.env` file exists and has the correct variable names
- Make sure all variables are prefixed with `VITE_`
- Restart your development server after creating/updating `.env`

#### 2. "Failed to fetch data: 403"

- Your API key might not have access to the Sheets API
- Make sure the Google Sheet is publicly accessible
- Check that the Google Sheets API is enabled in your Google Cloud project

#### 3. "Failed to fetch data: 404"

- Double-check your Sheet ID
- Make sure the sheet name matches `VITE_SHEET_NAME`
- Verify the sheet is shared publicly

#### 4. "No data found in Google Sheets"

- Check that your data starts from row 2 (row 1 should be headers)
- Make sure there are no completely empty rows
- Verify the sheet name is correct

#### 5. Data appears incorrectly

- Ensure columns are in the exact order specified in Step 1
- Check for extra spaces or formatting in your sheet data

### Testing Without Google Sheets

If you haven't set up Google Sheets yet, the app will automatically fall back to the static data and show a warning in the console. This allows you to continue development while setting up the integration.

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is safe to commit (it contains no real credentials)
- Consider restricting your API key to only the Google Sheets API
- Your Google Sheet should be read-only for public access

## Adding New Games

Once set up, you can add new games by:

1. Opening your Google Sheet
2. Adding a new row with the game data
3. Clicking "Refresh Games" in your application

The changes will appear immediately without needing to redeploy your application!
