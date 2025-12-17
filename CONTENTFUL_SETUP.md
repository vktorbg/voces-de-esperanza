# Contentful Management Token Setup

## Required for Audio Upload Feature

To enable automatic syncing of Firebase audio URLs to Contentful, you need to add a Contentful Management Token to your `.env` file.

### Steps to Get Your Management Token:

1. Go to [Contentful](https://app.contentful.com)
2. Navigate to **Settings** → **API keys**
3. Click on **Content management tokens** tab
4. Click **Generate personal token**
5. Give it a name like "Audio Upload Sync"
6. Copy the generated token (you won't be able to see it again!)

### Add to .env file:

Open your `.env` file and add this line:

```bash
GATSBY_CONTENTFUL_MANAGEMENT_TOKEN=
```

Replace `your_token_here` with the actual token you copied from Contentful.

### Security Note:

- The `.env` file is already in `.gitignore`, so your token won't be committed to git
- Keep this token secret - it has write access to your Contentful space
- The upload page requires Firebase authentication before use

### What This Enables:

When you upload audio files via the `/upload` page:

1. Audio is converted to .m4a format
2. Uploaded to Firebase Storage
3. **Automatically synced to Contentful** (new!)
4. Now available for playback in the iOS app via Contentful API

This fixes the "timeout getting audios" issue on iPhone by using Contentful's reliable CDN instead of Firebase Storage's slower file listing.

### Testing:

After adding the token:

1. Restart your dev server: `npm run develop`
2. Go to `/upload` page
3. Upload a test audio file (e.g., `2025-12-17-es.m4a`)
4. Check the logs - you should see:
   - "Uploaded to Firebase: ..."
   - "Syncing to Contentful for ..."
   - "✅ Synced to Contentful: ..."
5. Build and test on iOS - audio should load without timeout errors
