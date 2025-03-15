import { parseString } from 'xml2js';
import axios from 'axios';

/**
 * RSS Feed Parser for podcast feeds
 * Handles parsing and normalizing podcast RSS feeds
 */
class RSSFeedParser {
  /**
   * Parse an RSS feed from a URL
   * @param {string} url - The URL of the RSS feed
   * @returns {Promise<Object>} - Parsed podcast data
   */
  static async parseFromUrl(url) {
    try {
      const response = await axios.get(url);
      return this.parseFromString(response.data);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      throw new Error(`Failed to fetch RSS feed: ${error.message}`);
    }
  }

  /**
   * Parse an RSS feed from an XML string
   * @param {string} xmlString - The XML string to parse
   * @returns {Promise<Object>} - Parsed podcast data
   */
  static parseFromString(xmlString) {
    return new Promise((resolve, reject) => {
      parseString(xmlString, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          reject(new Error(`Failed to parse XML: ${err.message}`));
          return;
        }

        try {
          const parsedData = this.normalizePodcastData(result);
          resolve(parsedData);
        } catch (error) {
          console.error('Error normalizing podcast data:', error);
          reject(new Error(`Failed to normalize podcast data: ${error.message}`));
        }
      });
    });
  }

  /**
   * Normalize podcast data from parsed XML
   * @param {Object} data - The parsed XML data
   * @returns {Object} - Normalized podcast data
   */
  static normalizePodcastData(data) {
    if (!data.rss || !data.rss.channel) {
      throw new Error('Invalid RSS feed format');
    }

    const channel = data.rss.channel;
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];

    // Extract iTunes specific data if available
    const itunesData = this.extractItunesData(channel);

    // Basic podcast info
    const podcast = {
      title: channel.title || '',
      description: channel.description || '',
      link: channel.link || '',
      language: channel.language || 'en-us',
      copyright: channel.copyright || '',
      lastBuildDate: channel.lastBuildDate || '',
      pubDate: channel.pubDate || '',
      generator: channel.generator || '',
      author: itunesData.author || channel.managingEditor || '',
      explicit: itunesData.explicit || false,
      category: itunesData.category || '',
      subcategory: itunesData.subcategory || '',
      image: this.extractImageUrl(channel),
      owner: {
        name: itunesData.ownerName || '',
        email: itunesData.ownerEmail || channel.managingEditor || '',
      },
      episodes: this.normalizeEpisodes(items),
    };

    return podcast;
  }

  /**
   * Extract iTunes specific data from channel
   * @param {Object} channel - The channel object from parsed XML
   * @returns {Object} - Extracted iTunes data
   */
  static extractItunesData(channel) {
    const itunesData = {
      author: '',
      explicit: false,
      category: '',
      subcategory: '',
      ownerName: '',
      ownerEmail: '',
    };

    // Extract iTunes author
    if (channel['itunes:author']) {
      itunesData.author = channel['itunes:author'];
    }

    // Extract iTunes explicit flag
    if (channel['itunes:explicit']) {
      itunesData.explicit = channel['itunes:explicit'].toLowerCase() === 'yes' || 
                           channel['itunes:explicit'].toLowerCase() === 'true';
    }

    // Extract iTunes category and subcategory
    if (channel['itunes:category']) {
      const categories = Array.isArray(channel['itunes:category']) 
        ? channel['itunes:category'] 
        : [channel['itunes:category']];
      
      if (categories.length > 0) {
        itunesData.category = categories[0]?.$.text || '';
        
        // Check for subcategory
        if (categories[0]?.['itunes:category']) {
          itunesData.subcategory = categories[0]['itunes:category'].$.text || '';
        }
      }
    }

    // Extract iTunes owner info
    if (channel['itunes:owner']) {
      itunesData.ownerName = channel['itunes:owner']['itunes:name'] || '';
      itunesData.ownerEmail = channel['itunes:owner']['itunes:email'] || '';
    }

    return itunesData;
  }

  /**
   * Extract image URL from channel
   * @param {Object} channel - The channel object from parsed XML
   * @returns {string} - Image URL
   */
  static extractImageUrl(channel) {
    // Try iTunes image first
    if (channel['itunes:image'] && channel['itunes:image'].$.href) {
      return channel['itunes:image'].$.href;
    }
    
    // Fall back to standard image
    if (channel.image && channel.image.url) {
      return channel.image.url;
    }
    
    return '';
  }

  /**
   * Normalize episode data from items
   * @param {Array} items - The items array from parsed XML
   * @returns {Array} - Normalized episodes
   */
  static normalizeEpisodes(items) {
    if (!items) return [];

    return items.map(item => {
      // Extract enclosure (audio file) data
      const enclosure = item.enclosure || {};
      
      // Extract iTunes duration
      let duration = '';
      if (item['itunes:duration']) {
        duration = item['itunes:duration'];
      }
      
      // Format duration if it's just seconds
      if (duration && !isNaN(duration) && !duration.includes(':')) {
        const seconds = parseInt(duration, 10);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        duration = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      }

      return {
        title: item.title || '',
        description: item.description || '',
        pubDate: item.pubDate || '',
        link: item.link || '',
        guid: item.guid?._ || item.guid || '',
        audioUrl: enclosure.url || '',
        audioType: enclosure.type || '',
        audioSize: enclosure.length || 0,
        duration: duration,
        explicit: item['itunes:explicit'] ? 
                 (item['itunes:explicit'].toLowerCase() === 'yes' || 
                  item['itunes:explicit'].toLowerCase() === 'true') : 
                 false,
        episodeNumber: item['itunes:episode'] || '',
        season: item['itunes:season'] || '',
        episodeType: item['itunes:episodeType'] || 'full',
        image: item['itunes:image']?.$.href || '',
      };
    });
  }
}

export default RSSFeedParser;
