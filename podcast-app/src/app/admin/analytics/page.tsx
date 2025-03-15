"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiUsers, FiClock, FiPercent, FiShare2, FiDownload, FiCalendar } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';
import AnalyticsService from '@/lib/api/AnalyticsService';

// Import chart components (would use a library like recharts in a real app)
const LineChart = ({ data, dataKey, stroke = "#29F49A" }) => (
  <div className="h-64 w-full bg-white/5 rounded-lg p-4 relative">
    <div className="text-center absolute inset-0 flex items-center justify-center text-white/50">
      Chart visualization would appear here
    </div>
  </div>
);

const PieChart = ({ data }) => (
  <div className="h-64 w-full bg-white/5 rounded-lg p-4 relative">
    <div className="text-center absolute inset-0 flex items-center justify-center text-white/50">
      Pie chart visualization would appear here
    </div>
  </div>
);

const BarChart = ({ data, dataKey }) => (
  <div className="h-64 w-full bg-white/5 rounded-lg p-4 relative">
    <div className="text-center absolute inset-0 flex items-center justify-center text-white/50">
      Bar chart visualization would appear here
    </div>
  </div>
);

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Mock podcast ID for demo
  const podcastId = '1';

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const data = await AnalyticsService.getPodcastAnalytics(podcastId, { timeframe });
        setAnalyticsData(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [podcastId, timeframe]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#29F49A] mb-4"></div>
          <p className="text-white/70">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <div className="bg-red-500/20 border border-red-500/50 text-white p-6 rounded-lg text-center">
          <p className="mb-4">{error}</p>
          <Button 
            variant="primary" 
            size="md" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  const { summary, dailyData, topEpisodes, demographics } = analyticsData;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-white/70 mt-1">
            Track performance and engagement for your podcast
          </p>
        </div>
        
        <div className="flex space-x-2 bg-white/5 rounded-lg p-1">
          <Button 
            variant={timeframe === 'day' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => handleTimeframeChange('day')}
          >
            Day
          </Button>
          <Button 
            variant={timeframe === 'week' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => handleTimeframeChange('week')}
          >
            Week
          </Button>
          <Button 
            variant={timeframe === 'month' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => handleTimeframeChange('month')}
          >
            Month
          </Button>
          <Button 
            variant={timeframe === 'year' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => handleTimeframeChange('year')}
          >
            Year
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassmorphicCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Plays</p>
              <h3 className="text-2xl font-bold">{summary.totalPlays.toLocaleString()}</h3>
            </div>
            <div className="p-3 rounded-full bg-[#0072C6]/20 text-[#0072C6]">
              <FiBarChart2 size={24} />
            </div>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Unique Listeners</p>
              <h3 className="text-2xl font-bold">{summary.uniqueListeners.toLocaleString()}</h3>
            </div>
            <div className="p-3 rounded-full bg-[#29F49A]/20 text-[#29F49A]">
              <FiUsers size={24} />
            </div>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Avg. Listen Time</p>
              <h3 className="text-2xl font-bold">
                {Math.floor(summary.avgListenTime / 60)}:{(summary.avgListenTime % 60).toString().padStart(2, '0')}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-[#0072C6]/20 text-[#0072C6]">
              <FiClock size={24} />
            </div>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Completion Rate</p>
              <h3 className="text-2xl font-bold">{Math.round(summary.completionRate * 100)}%</h3>
            </div>
            <div className="p-3 rounded-full bg-[#29F49A]/20 text-[#29F49A]">
              <FiPercent size={24} />
            </div>
          </div>
        </GlassmorphicCard>
      </div>
      
      {/* Engagement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassmorphicCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Shares</h3>
            <div className="p-2 rounded-full bg-white/10 text-white/70">
              <FiShare2 size={18} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold">{summary.engagement.shares.toLocaleString()}</h2>
            <p className="text-white/60 text-sm">
              {Math.round((summary.engagement.shares / summary.totalPlays) * 100)}% of plays
            </p>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Downloads</h3>
            <div className="p-2 rounded-full bg-white/10 text-white/70">
              <FiDownload size={18} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold">{summary.engagement.downloads.toLocaleString()}</h2>
            <p className="text-white/60 text-sm">
              {Math.round((summary.engagement.downloads / summary.totalPlays) * 100)}% of plays
            </p>
          </div>
        </GlassmorphicCard>
      </div>
      
      {/* Plays Over Time Chart */}
      <GlassmorphicCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Plays Over Time</h3>
          <div className="flex items-center text-white/60 text-sm">
            <FiCalendar className="mr-2" size={14} />
            {timeframe === 'day' ? 'Last 24 hours' : 
             timeframe === 'week' ? 'Last 7 days' : 
             timeframe === 'month' ? 'Last 30 days' : 'Last 365 days'}
          </div>
        </div>
        <LineChart data={dailyData} dataKey="plays" />
      </GlassmorphicCard>
      
      {/* Top Episodes */}
      <GlassmorphicCard className="p-6">
        <h3 className="text-lg font-semibold mb-6">Top Episodes</h3>
        <div className="space-y-4">
          {topEpisodes.map((episode, index) => (
            <div key={episode.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 mr-4">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{episode.title}</p>
                  <p className="text-sm text-white/60">{episode.plays.toLocaleString()} plays</p>
                </div>
              </div>
              <div className="w-24 h-8 bg-white/5 rounded-full overflow-hidden relative">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0072C6] to-[#29F49A]"
                  style={{ width: `${(episode.plays / topEpisodes[0].plays) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </GlassmorphicCard>
      
      {/* Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassmorphicCard className="p-6">
          <h3 className="text-lg font-semibold mb-6">Listening Platforms</h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <PieChart data={demographics.platforms} />
            </div>
            <div className="w-full md:w-1/2 space-y-3 mt-4 md:mt-0">
              {demographics.platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ 
                        backgroundColor: index === 0 ? '#0072C6' : 
                                         index === 1 ? '#29F49A' : 
                                         `rgba(255, 255, 255, ${0.7 - index * 0.2})` 
                      }}
                    ></div>
                    <span>{platform.name}</span>
                  </div>
                  <span>{Math.round(platform.percentage * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard className="p-6">
          <h3 className="text-lg font-semibold mb-6">Listener Locations</h3>
          <BarChart data={demographics.countries} dataKey="percentage" />
          <div className="space-y-3 mt-4">
            {demographics.countries.slice(0, 5).map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{country.name}</span>
                <div className="w-48 h-6 bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0072C6] to-[#29F49A]"
                    style={{ width: `${country.percentage * 100}%` }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-end pr-2 text-xs">
                    {Math.round(country.percentage * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
