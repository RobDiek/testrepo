"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiUpload, FiRefreshCw } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

// Mock data for podcasts
const mockPodcasts = [
  {
    id: 1,
    title: 'Tech Talk Today',
    author: 'Sarah Johnson',
    category: 'Technology',
    episodeCount: 42,
    lastUpdated: '2025-03-10',
    coverImage: '/placeholder-cover-1.jpg',
  },
  {
    id: 2,
    title: 'Science Simplified',
    author: 'Dr. Alex Rivera',
    category: 'Science',
    episodeCount: 28,
    lastUpdated: '2025-03-05',
    coverImage: '/placeholder-cover-2.jpg',
  },
  {
    id: 3,
    title: 'Business Insights',
    author: 'Michael Chen',
    category: 'Business',
    episodeCount: 35,
    lastUpdated: '2025-03-01',
    coverImage: '/placeholder-cover-3.jpg',
  },
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const filteredPodcasts = mockPodcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPodcast = () => {
    setIsAddModalOpen(true);
  };

  const handleImportRSS = () => {
    setIsImportModalOpen(true);
  };

  const handleEditPodcast = (podcast) => {
    setSelectedPodcast(podcast);
    setIsAddModalOpen(true);
  };

  const handleDeletePodcast = (podcastId) => {
    // In a real app, this would call an API to delete the podcast
    console.log(`Delete podcast with ID: ${podcastId}`);
    // Then refresh the list
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-white/70 mt-1">
            Manage your podcasts and episodes
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="primary" 
            size="md" 
            className="flex items-center"
            onClick={handleAddPodcast}
          >
            <FiPlus className="mr-2" />
            Add Podcast
          </Button>
          
          <Button 
            variant="secondary" 
            size="md" 
            className="flex items-center"
            onClick={handleImportRSS}
          >
            <FiUpload className="mr-2" />
            Import RSS
          </Button>
        </div>
      </div>
      
      <GlassmorphicCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Podcasts</h2>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Cover</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Author</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Episodes</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Last Updated</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPodcasts.map((podcast) => (
                <motion.tr 
                  key={podcast.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
                      {/* In a real app, this would display the actual cover image */}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{podcast.title}</td>
                  <td className="px-4 py-3 text-white/70">{podcast.author}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80">
                      {podcast.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/70">{podcast.episodeCount}</td>
                  <td className="px-4 py-3 text-white/70">{podcast.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditPodcast(podcast)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePodcast(podcast.id)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {filteredPodcasts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/50">
                    No podcasts found. Add a new podcast or import from RSS.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassmorphicCard>
      
      {/* Add/Edit Podcast Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            <GlassmorphicCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedPodcast ? 'Edit Podcast' : 'Add New Podcast'}
                </h2>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedPodcast(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Title
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedPodcast?.title || ''}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Author
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedPodcast?.author || ''}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Category
                    </label>
                    <select
                      defaultValue={selectedPodcast?.category || ''}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                    >
                      <option value="">Select a category</option>
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
                      Cover Image
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
                        {/* In a real app, this would display the actual cover image */}
                      </div>
                      <Button variant="outline" size="sm">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={selectedPodcast?.description || ''}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    size="md"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setSelectedPodcast(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="md">
                    {selectedPodcast ? 'Save Changes' : 'Add Podcast'}
                  </Button>
                </div>
              </form>
            </GlassmorphicCard>
          </motion.div>
        </div>
      )}
      
      {/* Import RSS Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <GlassmorphicCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Import from RSS</h2>
                <button 
                  onClick={() => setIsImportModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    RSS Feed URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/feed.xml"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="auto-update"
                      type="checkbox"
                      className="h-4 w-4 accent-[#29F49A]"
                    />
                    <label htmlFor="auto-update" className="ml-2 block text-sm text-white/80">
                      Automatically update from RSS feed
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    size="md"
                    onClick={() => setIsImportModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" className="flex items-center">
                    <FiRefreshCw className="mr-2" />
                    Import Feed
                  </Button>
                </div>
              </form>
            </GlassmorphicCard>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
