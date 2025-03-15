import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

// Mock data for podcast metadata
const mockPodcastMetadata = {
  id: 1,
  title: 'Tech Talk Today',
  author: 'Sarah Johnson',
  email: 'sarah@techtalktoday.com',
  category: 'Technology',
  subcategory: 'Tech News',
  language: 'English',
  explicit: false,
  copyright: '© 2025 Tech Talk Today',
  website: 'https://techtalktoday.com',
  description: 'The latest in tech news and interviews with industry leaders.',
  longDescription: 'Tech Talk Today is a weekly podcast covering the latest technology news, trends, and innovations. Join host Sarah Johnson as she interviews industry leaders, explores cutting-edge technologies, and breaks down complex tech concepts into digestible insights.',
  keywords: 'technology, tech news, innovation, interviews, AI, blockchain, computing',
  ownerName: 'Sarah Johnson',
  ownerEmail: 'sarah@techtalktoday.com',
  coverImage: '/placeholder-cover-1.jpg',
  rssFeedUrl: 'https://techtalktoday.com/feed.xml',
};

const MetadataEditor = () => {
  const [metadata, setMetadata] = useState(mockPodcastMetadata);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMetadata({
      ...metadata,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    
    // In a real app, this would call an API to update the metadata
    try {
      // Simulate API call
      setTimeout(() => {
        setIsSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      }, 1000);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
            Metadata Editor
          </h1>
          <p className="text-white/70 mt-1">
            Edit podcast metadata and RSS feed information
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
        <form onSubmit={handleSubmit} className="space-y-8">
          {isSuccess && (
            <div className="bg-green-500/20 border border-green-500/50 text-white p-3 rounded-lg">
              Metadata updated successfully!
            </div>
          )}
          
          {isError && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg">
              An error occurred while updating metadata. Please try again.
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Podcast Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={metadata.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Author/Host
                </label>
                <input
                  type="text"
                  name="author"
                  value={metadata.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={metadata.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={metadata.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Category
                </label>
                <select
                  name="category"
                  value={metadata.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                >
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                  <option value="Health">Health</option>
                  <option value="History">History</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Subcategory
                </label>
                <input
                  type="text"
                  name="subcategory"
                  value={metadata.subcategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Language
                </label>
                <select
                  name="language"
                  value={metadata.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Copyright
                </label>
                <input
                  type="text"
                  name="copyright"
                  value={metadata.copyright}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2 flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="explicit"
                    checked={metadata.explicit}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#29F49A]"
                  />
                  <span className="ml-2 text-sm font-medium text-white/80">
                    Contains explicit content
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Descriptions</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Short Description (for listings)
                </label>
                <textarea
                  name="description"
                  value={metadata.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                ></textarea>
                <p className="text-xs text-white/50">
                  Brief description that appears in podcast listings (max 255 characters)
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Long Description (for podcast page)
                </label>
                <textarea
                  name="longDescription"
                  value={metadata.longDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                ></textarea>
                <p className="text-xs text-white/50">
                  Detailed description that appears on your podcast page
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={metadata.keywords}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
                <p className="text-xs text-white/50">
                  Comma-separated keywords to help with discoverability
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">RSS Feed Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={metadata.ownerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Owner Email
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={metadata.ownerEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-white/80">
                  RSS Feed URL
                </label>
                <div className="flex">
                  <input
                    type="url"
                    name="rssFeedUrl"
                    value={metadata.rssFeedUrl}
                    readOnly
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-l-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-white/10 border border-white/20 border-l-0 rounded-r-lg hover:bg-white/20 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(metadata.rssFeedUrl);
                      alert('RSS Feed URL copied to clipboard!');
                    }}
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-white/50">
                  Share this URL with podcast directories to list your podcast
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Cover Image</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
                  {/* In a real app, this would display the actual cover image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0072C6]/30 to-[#29F49A]/30" />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
                <p className="text-white/70">
                  Your podcast cover image should be a square JPG or PNG file, 3000 x 3000 pixels recommended for best quality across all platforms.
                </p>
                
                <Button variant="outline" size="md">
                  Upload New Cover Image
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
            <Button 
              type="button"
              variant="outline" 
              size="md"
              className="flex items-center"
              onClick={() => window.history.back()}
            >
              <FiX className="mr-2" />
              Cancel
            </Button>
            
            <Button 
              type="submit"
              variant="primary" 
              size="md"
              className="flex items-center"
            >
              <FiSave className="mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </GlassmorphicCard>
    </div>
  );
};

export default MetadataEditor;
