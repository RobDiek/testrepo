"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';
import RSSFeedParser from '@/lib/api/RSSFeedParser';

const RSSFeedImporter = () => {
  const [feedUrl, setFeedUrl] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedPreview, setFeedPreview] = useState(null);
  const [error, setError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFeedUrlChange = (e) => {
    setFeedUrl(e.target.value);
    setError('');
    setFeedPreview(null);
    setImportSuccess(false);
  };

  const handlePreviewFeed = async (e) => {
    e.preventDefault();
    
    if (!feedUrl) {
      setError('Please enter a valid RSS feed URL');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setFeedPreview(null);
    
    try {
      // In a real app, this would call an API endpoint that uses the RSSFeedParser
      // For demo purposes, we'll simulate the response
      setTimeout(() => {
        // Simulate a successful response
        const mockPodcastData = {
          title: 'Tech Talk Today',
          description: 'The latest in tech news and interviews with industry leaders.',
          author: 'Sarah Johnson',
          category: 'Technology',
          image: '/placeholder-cover-1.jpg',
          episodes: [
            {
              title: 'The Future of AI in Everyday Life',
              description: 'Exploring how artificial intelligence is becoming integrated into our daily routines.',
              pubDate: 'Mon, 10 Mar 2025 12:00:00 GMT',
              duration: '42:18',
              audioUrl: 'https://example.com/episodes/future-of-ai.mp3',
            },
            {
              title: 'Blockchain Beyond Cryptocurrency',
              description: 'Examining the practical applications of blockchain technology outside of digital currencies.',
              pubDate: 'Mon, 03 Mar 2025 12:00:00 GMT',
              duration: '38:45',
              audioUrl: 'https://example.com/episodes/blockchain-beyond-crypto.mp3',
            },
            {
              title: 'The Rise of Quantum Computing',
              description: 'Understanding quantum computing and its potential to revolutionize data processing.',
              pubDate: 'Tue, 25 Feb 2025 12:00:00 GMT',
              duration: '45:22',
              audioUrl: 'https://example.com/episodes/quantum-computing.mp3',
            }
          ],
          episodeCount: 42,
          lastUpdated: 'Mon, 10 Mar 2025 12:00:00 GMT'
        };
        
        setFeedPreview(mockPodcastData);
        setIsLoading(false);
      }, 1500);
      
    } catch (err) {
      setError(`Failed to parse RSS feed: ${err.message}`);
      setIsLoading(false);
    }
  };

  const handleImportFeed = () => {
    if (!feedPreview) {
      setError('Please preview the feed before importing');
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would call an API to import the podcast
    setTimeout(() => {
      setImportSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
            RSS Feed Import
          </h1>
          <p className="text-white/70 mt-1">
            Import podcasts and episodes from RSS feeds
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="md" 
          className="flex items-center"
          onClick={() => window.history.back()}
        >
          Back to Dashboard
        </Button>
      </div>
      
      <GlassmorphicCard className="p-6">
        <form onSubmit={handlePreviewFeed} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg flex items-center">
              <FiAlertTriangle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {importSuccess && (
            <div className="bg-green-500/20 border border-green-500/50 text-white p-3 rounded-lg flex items-center">
              <FiCheck className="mr-2 flex-shrink-0" />
              <span>Podcast successfully imported!</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              RSS Feed URL
            </label>
            <div className="flex">
              <input
                type="url"
                placeholder="https://example.com/feed.xml"
                value={feedUrl}
                onChange={handleFeedUrlChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
              />
              <Button 
                type="submit"
                variant="primary" 
                className="rounded-l-none"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Preview'}
              </Button>
            </div>
            <p className="text-xs text-white/50">
              Enter the URL of a podcast RSS feed to import
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="auto-update"
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="h-4 w-4 accent-[#29F49A]"
              />
              <label htmlFor="auto-update" className="ml-2 block text-sm text-white/80">
                Automatically update from RSS feed (daily)
              </label>
            </div>
            <p className="text-xs text-white/50 ml-6">
              When enabled, the podcast will be automatically updated with new episodes from the RSS feed
            </p>
          </div>
        </form>
      </GlassmorphicCard>
      
      {feedPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassmorphicCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Feed Preview</h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full md:w-1/4 lg:w-1/5">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
                  {/* In a real app, this would display the actual cover image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0072C6]/30 to-[#29F49A]/30" />
                </div>
              </div>
              
              <div className="w-full md:w-3/4 lg:w-4/5 space-y-4">
                <h3 className="text-2xl font-bold">{feedPreview.title}</h3>
                <p className="text-white/70">{feedPreview.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-white/50">Author:</span> {feedPreview.author}
                  </div>
                  <div>
                    <span className="text-white/50">Category:</span> {feedPreview.category}
                  </div>
                  <div>
                    <span className="text-white/50">Episodes:</span> {feedPreview.episodeCount}
                  </div>
                  <div>
                    <span className="text-white/50">Last Updated:</span> {feedPreview.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Episodes</h3>
              
              <div className="space-y-3">
                {feedPreview.episodes.map((episode, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg">
                    <div className="font-medium">{episode.title}</div>
                    <div className="text-sm text-white/60 mb-2">{episode.description}</div>
                    <div className="flex flex-wrap gap-4 text-xs text-white/50">
                      <div>{episode.pubDate}</div>
                      <div>{episode.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  variant="primary" 
                  size="md" 
                  className="flex items-center"
                  onClick={handleImportFeed}
                  disabled={isLoading || importSuccess}
                >
                  <FiRefreshCw className="mr-2" />
                  {isLoading ? 'Importing...' : importSuccess ? 'Imported' : 'Import Podcast'}
                </Button>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      )}
    </div>
  );
};

export default RSSFeedImporter;
