// src/services/contentful-management.js
// Service for updating Contentful entries via Management API

import { createClient } from 'contentful-management';

let managementClient = null;

/**
 * Get or create Contentful Management API client
 */
const getManagementClient = () => {
  if (!managementClient) {
    const accessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_TOKEN;

    if (!accessToken) {
      console.error('⚠️ GATSBY_CONTENTFUL_MANAGEMENT_TOKEN not found in environment');
      return null;
    }

    managementClient = createClient({
      accessToken: accessToken,
    });
  }
  return managementClient;
};

/**
 * Update audio field in a Contentful devotional entry
 *
 * @param {string} date - The devotional date (YYYY-MM-DD)
 * @param {string} langCode - Language code (es, en, nah)
 * @param {string} audioUrl - Firebase Storage URL or any external URL
 * @returns {Promise<boolean>} - Success status
 */
export const updateContentfulAudioField = async (date, langCode, audioUrl) => {
  const client = getManagementClient();
  if (!client) {
    throw new Error('Contentful Management client not available');
  }

  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!spaceId) {
    throw new Error('Contentful Space ID not found');
  }

  try {
    console.log(`🔍 Looking for devotional with date: ${date}`);

    // Get space and environment
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(environment);

    // Find the devotional entry by date
    const entries = await env.getEntries({
      content_type: 'devotional',
      'fields.date': date,
      limit: 1,
    });

    if (entries.items.length === 0) {
      throw new Error(`No devotional found for date ${date}`);
    }

    const entry = entries.items[0];
    console.log(`✅ Found devotional entry: ${entry.sys.id}`);

    // Determine which field to update based on language code
    let fieldName;
    if (langCode === 'es') {
      fieldName = 'audioEspanol';
    } else if (langCode === 'en') {
      fieldName = 'audioEnglish';
    } else if (langCode === 'nah') {
      fieldName = 'audioNahuatl';
    } else {
      throw new Error(`Unknown language code: ${langCode}`);
    }

    // Create asset with external URL
    console.log(`📤 Creating Contentful asset for ${fieldName} with URL: ${audioUrl}`);

    const asset = await env.createAsset({
      fields: {
        title: {
          'es-MX': `Audio ${langCode} - ${date}`,
          'en-US': `Audio ${langCode} - ${date}`,
        },
        description: {
          'es-MX': `Audio devocional en ${langCode} para ${date}`,
          'en-US': `Devotional audio in ${langCode} for ${date}`,
        },
        file: {
          'es-MX': {
            contentType: 'audio/mp4',
            fileName: `${date}-${langCode}.m4a`,
            upload: audioUrl,
          },
          'en-US': {
            contentType: 'audio/mp4',
            fileName: `${date}-${langCode}.m4a`,
            upload: audioUrl,
          },
        },
      },
    });

    // Process the asset (upload from URL)
    console.log('⏳ Processing asset...');
    const processedAsset = await asset.processForAllLocales();

    // Wait for processing to complete (poll status)
    let processingAttempts = 0;
    let assetReady = false;
    while (processingAttempts < 10 && !assetReady) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      const updatedAsset = await env.getAsset(processedAsset.sys.id);

      // Check if file is processed for both locales
      const esMxFile = updatedAsset.fields.file?.['es-MX'];
      const enUsFile = updatedAsset.fields.file?.['en-US'];

      if (esMxFile?.url && enUsFile?.url) {
        assetReady = true;
        console.log('✅ Asset processed successfully');
      } else {
        processingAttempts++;
        console.log(`⏳ Waiting for asset processing... (attempt ${processingAttempts}/10)`);
      }
    }

    if (!assetReady) {
      throw new Error('Asset processing timed out');
    }

    // Publish the asset
    const finalAsset = await env.getAsset(processedAsset.sys.id);
    const publishedAsset = await finalAsset.publish();
    console.log('📢 Asset published');

    // Update the devotional entry with the asset reference
    // Note: We need to set the field for both locales if using withAllLocales
    entry.fields[fieldName] = {
      'es-MX': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: publishedAsset.sys.id,
        },
      },
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: publishedAsset.sys.id,
        },
      },
    };

    const updatedEntry = await entry.update();
    console.log(`✅ Updated ${fieldName} field in devotional entry`);

    // Publish the entry
    await updatedEntry.publish();
    console.log('📢 Devotional entry published');

    return true;
  } catch (error) {
    console.error('❌ Error updating Contentful audio field:', error);
    throw error;
  }
};
