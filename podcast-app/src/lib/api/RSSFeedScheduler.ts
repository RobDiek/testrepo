import { useState, useEffect } from 'react';

/**
 * Hook for scheduling automatic RSS feed updates
 * @param {Array} podcasts - Array of podcasts with autoUpdate flag
 * @param {Function} updateCallback - Function to call when updating podcasts
 * @param {number} intervalHours - Hours between update checks (default: 24)
 */
export function useRSSFeedScheduler(podcasts = [], updateCallback, intervalHours = 24) {
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    // Find podcasts with autoUpdate enabled
    const podcastsToUpdate = podcasts.filter(podcast => podcast.autoUpdate);
    
    if (podcastsToUpdate.length === 0) {
      return; // No podcasts to auto-update
    }
    
    // Convert interval to milliseconds
    const intervalMs = intervalHours * 60 * 60 * 1000;
    
    // Check if it's time to update
    const checkAndUpdate = async () => {
      const now = new Date();
      
      // If no previous update or enough time has passed
      if (!lastUpdateTime || (now.getTime() - lastUpdateTime.getTime() >= intervalMs)) {
        setIsUpdating(true);
        
        try {
          // Call the update callback with podcasts that need updating
          await updateCallback(podcastsToUpdate);
          setLastUpdateTime(now);
        } catch (error) {
          console.error('Error updating RSS feeds:', error);
        } finally {
          setIsUpdating(false);
        }
      }
    };
    
    // Run initial check
    checkAndUpdate();
    
    // Set up interval for future checks
    const intervalId = setInterval(checkAndUpdate, 60 * 60 * 1000); // Check every hour
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [podcasts, updateCallback, intervalHours, lastUpdateTime]);
  
  return { isUpdating, lastUpdateTime };
}

/**
 * Function to manually trigger RSS feed updates
 * @param {Array} podcasts - Array of podcasts to update
 * @param {Function} updateCallback - Function to call when updating podcasts
 * @returns {Promise<void>}
 */
export async function triggerRSSFeedUpdates(podcasts, updateCallback) {
  if (!podcasts || podcasts.length === 0) {
    throw new Error('No podcasts provided for update');
  }
  
  if (!updateCallback || typeof updateCallback !== 'function') {
    throw new Error('Invalid update callback provided');
  }
  
  try {
    await updateCallback(podcasts);
    console.log(`Updated ${podcasts.length} podcasts from RSS feeds`);
  } catch (error) {
    console.error('Error triggering RSS feed updates:', error);
    throw error;
  }
}

export default {
  useRSSFeedScheduler,
  triggerRSSFeedUpdates
};
