/**
 * Analytics tracking service for podcast player
 * Handles tracking plays, listeners, and engagement metrics
 */
class AnalyticsService {
  /**
   * Track a play event
   * @param {Object} data - Play event data
   * @param {string} data.podcastId - ID of the podcast
   * @param {string} data.episodeId - ID of the episode
   * @param {string} data.userId - Anonymous user ID
   * @param {number} data.timestamp - Timestamp of the event
   * @param {string} data.source - Source of the play (web, mobile, etc.)
   * @returns {Promise<Object>} - Tracking result
   */
  static async trackPlay(data) {
    try {
      // In a real app, this would send data to an analytics API
      console.log('Track play event:', data);
      
      // Simulate API call
      return {
        success: true,
        eventId: `play_${Date.now()}`,
        ...data
      };
    } catch (error) {
      console.error('Error tracking play:', error);
      throw error;
    }
  }

  /**
   * Track a listen duration event
   * @param {Object} data - Listen event data
   * @param {string} data.podcastId - ID of the podcast
   * @param {string} data.episodeId - ID of the episode
   * @param {string} data.userId - Anonymous user ID
   * @param {number} data.duration - Duration listened in seconds
   * @param {number} data.timestamp - Timestamp of the event
   * @param {string} data.source - Source of the listen (web, mobile, etc.)
   * @returns {Promise<Object>} - Tracking result
   */
  static async trackListenDuration(data) {
    try {
      // In a real app, this would send data to an analytics API
      console.log('Track listen duration event:', data);
      
      // Simulate API call
      return {
        success: true,
        eventId: `duration_${Date.now()}`,
        ...data
      };
    } catch (error) {
      console.error('Error tracking listen duration:', error);
      throw error;
    }
  }

  /**
   * Track a user engagement event
   * @param {Object} data - Engagement event data
   * @param {string} data.podcastId - ID of the podcast
   * @param {string} data.episodeId - ID of the episode (optional)
   * @param {string} data.userId - Anonymous user ID
   * @param {string} data.action - Type of engagement (share, download, etc.)
   * @param {number} data.timestamp - Timestamp of the event
   * @param {string} data.source - Source of the engagement (web, mobile, etc.)
   * @returns {Promise<Object>} - Tracking result
   */
  static async trackEngagement(data) {
    try {
      // In a real app, this would send data to an analytics API
      console.log('Track engagement event:', data);
      
      // Simulate API call
      return {
        success: true,
        eventId: `engagement_${Date.now()}`,
        ...data
      };
    } catch (error) {
      console.error('Error tracking engagement:', error);
      throw error;
    }
  }

  /**
   * Get analytics data for a podcast
   * @param {string} podcastId - ID of the podcast
   * @param {Object} options - Query options
   * @param {string} options.timeframe - Timeframe for data (day, week, month, year)
   * @param {string} options.startDate - Start date for custom timeframe
   * @param {string} options.endDate - End date for custom timeframe
   * @returns {Promise<Object>} - Analytics data
   */
  static async getPodcastAnalytics(podcastId, options = {}) {
    try {
      // In a real app, this would fetch data from an analytics API
      console.log('Get podcast analytics:', podcastId, options);
      
      // Generate mock analytics data
      return this.generateMockPodcastAnalytics(podcastId, options);
    } catch (error) {
      console.error('Error getting podcast analytics:', error);
      throw error;
    }
  }

  /**
   * Get analytics data for an episode
   * @param {string} episodeId - ID of the episode
   * @param {Object} options - Query options
   * @param {string} options.timeframe - Timeframe for data (day, week, month, year)
   * @param {string} options.startDate - Start date for custom timeframe
   * @param {string} options.endDate - End date for custom timeframe
   * @returns {Promise<Object>} - Analytics data
   */
  static async getEpisodeAnalytics(episodeId, options = {}) {
    try {
      // In a real app, this would fetch data from an analytics API
      console.log('Get episode analytics:', episodeId, options);
      
      // Generate mock analytics data
      return this.generateMockEpisodeAnalytics(episodeId, options);
    } catch (error) {
      console.error('Error getting episode analytics:', error);
      throw error;
    }
  }

  /**
   * Generate mock analytics data for a podcast
   * @private
   * @param {string} podcastId - ID of the podcast
   * @param {Object} options - Query options
   * @returns {Object} - Mock analytics data
   */
  static generateMockPodcastAnalytics(podcastId, options) {
    const { timeframe = 'month' } = options;
    
    // Generate dates for the timeframe
    const dates = this.generateDateRange(timeframe);
    
    // Generate random data for each metric
    const totalPlays = Math.floor(Math.random() * 50000) + 10000;
    const uniqueListeners = Math.floor(totalPlays * 0.7);
    const avgListenTime = Math.floor(Math.random() * 1800) + 600; // 10-40 minutes in seconds
    
    // Generate daily data
    const dailyData = dates.map(date => {
      const dailyPlays = Math.floor(Math.random() * (totalPlays / dates.length * 1.5));
      return {
        date,
        plays: dailyPlays,
        uniqueListeners: Math.floor(dailyPlays * 0.7),
        avgListenTime: Math.floor(Math.random() * 1800) + 600,
        completionRate: Math.random() * 0.4 + 0.5, // 50-90%
      };
    });
    
    // Generate top episodes
    const topEpisodes = [
      { id: 101, title: 'The Future of AI in Everyday Life', plays: Math.floor(Math.random() * 5000) + 1000 },
      { id: 102, title: 'Blockchain Beyond Cryptocurrency', plays: Math.floor(Math.random() * 4000) + 800 },
      { id: 103, title: 'The Rise of Quantum Computing', plays: Math.floor(Math.random() * 3000) + 600 },
      { id: 104, title: 'Ethical Considerations in Tech Development', plays: Math.floor(Math.random() * 2000) + 400 },
      { id: 105, title: 'The Evolution of User Experience Design', plays: Math.floor(Math.random() * 1000) + 200 },
    ];
    
    // Generate listener demographics
    const demographics = {
      platforms: [
        { name: 'Web', percentage: Math.random() * 0.4 + 0.3 }, // 30-70%
        { name: 'iOS', percentage: Math.random() * 0.3 + 0.1 }, // 10-40%
        { name: 'Android', percentage: Math.random() * 0.3 + 0.1 }, // 10-40%
      ],
      countries: [
        { name: 'United States', percentage: Math.random() * 0.4 + 0.3 },
        { name: 'United Kingdom', percentage: Math.random() * 0.2 + 0.1 },
        { name: 'Canada', percentage: Math.random() * 0.15 + 0.05 },
        { name: 'Australia', percentage: Math.random() * 0.1 + 0.05 },
        { name: 'Germany', percentage: Math.random() * 0.1 + 0.02 },
        { name: 'Other', percentage: Math.random() * 0.1 + 0.02 },
      ],
    };
    
    return {
      podcastId,
      timeframe,
      summary: {
        totalPlays,
        uniqueListeners,
        avgListenTime,
        completionRate: Math.random() * 0.4 + 0.5, // 50-90%
        engagement: {
          shares: Math.floor(totalPlays * (Math.random() * 0.05 + 0.01)), // 1-6% of plays
          downloads: Math.floor(totalPlays * (Math.random() * 0.1 + 0.05)), // 5-15% of plays
        },
      },
      dailyData,
      topEpisodes,
      demographics,
    };
  }

  /**
   * Generate mock analytics data for an episode
   * @private
   * @param {string} episodeId - ID of the episode
   * @param {Object} options - Query options
   * @returns {Object} - Mock analytics data
   */
  static generateMockEpisodeAnalytics(episodeId, options) {
    const { timeframe = 'month' } = options;
    
    // Generate dates for the timeframe
    const dates = this.generateDateRange(timeframe);
    
    // Generate random data for each metric
    const totalPlays = Math.floor(Math.random() * 10000) + 2000;
    const uniqueListeners = Math.floor(totalPlays * 0.7);
    const avgListenTime = Math.floor(Math.random() * 1800) + 600; // 10-40 minutes in seconds
    
    // Generate daily data
    const dailyData = dates.map(date => {
      const dailyPlays = Math.floor(Math.random() * (totalPlays / dates.length * 1.5));
      return {
        date,
        plays: dailyPlays,
        uniqueListeners: Math.floor(dailyPlays * 0.7),
        avgListenTime: Math.floor(Math.random() * 1800) + 600,
        completionRate: Math.random() * 0.4 + 0.5, // 50-90%
      };
    });
    
    // Generate listener retention data (percentage of listeners at each point)
    const retentionData = [];
    let currentRetention = 1.0; // Start at 100%
    
    for (let i = 0; i <= 10; i++) {
      retentionData.push({
        position: i / 10, // 0.0, 0.1, 0.2, ..., 1.0
        retention: currentRetention,
      });
      
      // Decrease retention for next point (more drop-off at beginning and end)
      if (i < 3) {
        currentRetention -= Math.random() * 0.15; // Bigger drop at start
      } else if (i > 7) {
        currentRetention -= Math.random() * 0.1; // Medium drop at end
      } else {
        currentRetention -= Math.random() * 0.05; // Smaller drop in middle
      }
      
      // Ensure retention doesn't go below 0.2 (20%)
      currentRetention = Math.max(currentRetention, 0.2);
    }
    
    // Generate listener demographics
    const demographics = {
      platforms: [
        { name: 'Web', percentage: Math.random() * 0.4 + 0.3 }, // 30-70%
        { name: 'iOS', percentage: Math.random() * 0.3 + 0.1 }, // 10-40%
        { name: 'Android', percentage: Math.random() * 0.3 + 0.1 }, // 10-40%
      ],
      countries: [
        { name: 'United States', percentage: Math.random() * 0.4 + 0.3 },
        { name: 'United Kingdom', percentage: Math.random() * 0.2 + 0.1 },
        { name: 'Canada', percentage: Math.random() * 0.15 + 0.05 },
        { name: 'Australia', percentage: Math.random() * 0.1 + 0.05 },
        { name: 'Germany', percentage: Math.random() * 0.1 + 0.02 },
        { name: 'Other', percentage: Math.random() * 0.1 + 0.02 },
      ],
    };
    
    return {
      episodeId,
      timeframe,
      summary: {
        totalPlays,
        uniqueListeners,
        avgListenTime,
        completionRate: Math.random() * 0.4 + 0.5, // 50-90%
        engagement: {
          shares: Math.floor(totalPlays * (Math.random() * 0.05 + 0.01)), // 1-6% of plays
          downloads: Math.floor(totalPlays * (Math.random() * 0.1 + 0.05)), // 5-15% of plays
        },
      },
      dailyData,
      retentionData,
      demographics,
    };
  }

  /**
   * Generate a date range for the given timeframe
   * @private
   * @param {string} timeframe - Timeframe (day, week, month, year)
   * @returns {Array<string>} - Array of date strings
   */
  static generateDateRange(timeframe) {
    const dates = [];
    const now = new Date();
    let days = 30; // Default to month
    
    switch (timeframe) {
      case 'day':
        days = 1;
        break;
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'year':
        days = 365;
        break;
    }
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }
}

export default AnalyticsService;
