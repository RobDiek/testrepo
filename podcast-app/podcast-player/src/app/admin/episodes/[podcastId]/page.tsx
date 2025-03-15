"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiUpload, FiPlay, FiPause } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

// Mock data for episodes
const mockEpisodes = [
  {
    id: 101,
    podcastId: 1,
    title: 'The Future of AI in Everyday Life',
    description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society.',
    duration: '42:18',
    publishDate: '2025-03-10',
    listens: 1245,
    fileSize: '38.4 MB',
  },
  {
    id: 102,
    podcastId: 1,
    title: 'Blockchain Beyond Cryptocurrency',
    description: 'Examining the practical applications of blockchain technology outside of digital currencies.',
    duration: '38:45',
    publishDate: '2025-03-03',
    listens: 982,
    fileSize: '35.2 MB',
  },
  {
    id: 103,
    podcastId: 1,
    title: 'The Rise of Quantum Computing',
    description: 'Understanding quantum computing and its potential to revolutionize data processing and security.',
    duration: '45:22',
    publishDate: '2025-02-25',
    listens: 876,
    fileSize: '41.7 MB',
  },
  {
    id: 104,
    podcastId: 1,
    title: 'Ethical Considerations in Tech Development',
    description: 'Discussing the ethical responsibilities of tech companies and developers in creating new technologies.',
    duration: '51:07',
    publishDate: '2025-02-18',
    listens: 1032,
    fileSize: '46.8 MB',
  },
  {
    id: 105,
    podcastId: 1,
    title: 'The Evolution of User Experience Design',
    description: 'Tracing the development of UX design principles and their impact on modern technology.',
    duration: '36:54',
    publishDate: '2025-02-11',
    listens: 754,
    fileSize: '33.6 MB',
  },
];

const EpisodeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const filteredEpisodes = mockEpisodes.filter(episode => 
    episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEpisode = () => {
    setIsAddModalOpen(true);
  };

  const handleEditEpisode = (episode) => {
    setSelectedEpisode(episode);
    setIsAddModalOpen(true);
  };

  const handleDeleteEpisode = (episodeId) => {
    // In a real app, this would call an API to delete the episode
    console.log(`Delete episode with ID: ${episodeId}`);
    // Then refresh the list
  };

  const togglePlayback = (episodeId) => {
    if (currentlyPlaying === episodeId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episodeId);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
            Episode Management
          </h1>
          <p className="text-white/70 mt-1">
            Manage episodes for Tech Talk Today
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="primary" 
            size="md" 
            className="flex items-center"
            onClick={handleAddEpisode}
          >
            <FiPlus className="mr-2" />
            Add Episode
          </Button>
          
          <Button 
            variant="outline" 
            size="md" 
            className="flex items-center"
            onClick={() => window.history.back()}
          >
            Back to Podcasts
          </Button>
        </div>
      </div>
      
      <GlassmorphicCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Episodes</h2>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search episodes..."
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
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Publish Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Listens</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">File Size</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEpisodes.map((episode) => (
                <motion.tr 
                  key={episode.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{episode.title}</div>
                      <div className="text-sm text-white/60 line-clamp-1">{episode.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/70">{episode.duration}</td>
                  <td className="px-4 py-3 text-white/70">{episode.publishDate}</td>
                  <td className="px-4 py-3 text-white/70">{episode.listens.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/70">{episode.fileSize}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => togglePlayback(episode.id)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        {currentlyPlaying === episode.id ? <FiPause size={16} /> : <FiPlay size={16} />}
                      </button>
                      <button 
                        onClick={() => handleEditEpisode(episode)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteEpisode(episode.id)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {filteredEpisodes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white/50">
                    No episodes found. Add a new episode to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassmorphicCard>
      
      {/* Add/Edit Episode Modal */}
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
                  {selectedEpisode ? 'Edit Episode' : 'Add New Episode'}
                </h2>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedEpisode(null);
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
                      defaultValue={selectedEpisode?.title || ''}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedEpisode?.publishDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Audio File
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="No file selected"
                        readOnly
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none"
                      />
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Browse
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Episode Image (Optional)
                    </label>
                    <div className="flex items-center space-x-3">
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
                    defaultValue={selectedEpisode?.description || ''}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50"
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Show Notes (Markdown supported)
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={selectedEpisode?.shownotes || ''}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50 font-mono text-sm"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    size="md"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setSelectedEpisode(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="md">
                    {selectedEpisode ? 'Save Changes' : 'Add Episode'}
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

export default EpisodeManagement;
