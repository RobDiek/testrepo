import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiCalendar } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

// Mock data for podcast cards
const mockPodcasts = [
  {
    id: 1,
    title: 'Tech Talk Today',
    author: 'Sarah Johnson',
    category: 'Technology',
    description: 'The latest in tech news and interviews with industry leaders.',
    coverImage: '/placeholder-cover-1.jpg',
    episodes: 42,
  },
  {
    id: 2,
    title: 'Science Simplified',
    author: 'Dr. Alex Rivera',
    category: 'Science',
    description: 'Making complex scientific concepts accessible to everyone.',
    coverImage: '/placeholder-cover-2.jpg',
    episodes: 28,
  },
  {
    id: 3,
    title: 'Business Insights',
    author: 'Michael Chen',
    category: 'Business',
    description: 'Strategic insights for entrepreneurs and business professionals.',
    coverImage: '/placeholder-cover-3.jpg',
    episodes: 35,
  },
  {
    id: 4,
    title: 'Creative Minds',
    author: 'Emma Wilson',
    category: 'Arts',
    description: 'Exploring creativity across various art forms and industries.',
    coverImage: '/placeholder-cover-4.jpg',
    episodes: 19,
  },
  {
    id: 5,
    title: 'Health Matters',
    author: 'Dr. James Peterson',
    category: 'Health',
    description: 'Expert advice on health, wellness, and medical advancements.',
    coverImage: '/placeholder-cover-5.jpg',
    episodes: 51,
  },
  {
    id: 6,
    title: 'History Uncovered',
    author: 'Professor Lisa Thompson',
    category: 'History',
    description: 'Fascinating stories from history that shaped our world.',
    coverImage: '/placeholder-cover-6.jpg',
    episodes: 24,
  },
];

const PodcastCard = ({ podcast }) => {
  return (
    <Link href={`/podcast/${podcast.id}`}>
      <GlassmorphicCard className="h-full cursor-pointer">
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0072C6]/30 to-[#29F49A]/30 z-10" />
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
          <div className="absolute bottom-3 right-3 z-20">
            <Button variant="secondary" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
              <FiPlay className="ml-0.5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80">
              {podcast.category}
            </span>
            <span className="text-xs text-white/60 flex items-center">
              <FiClock className="mr-1" size={12} />
              {podcast.episodes} episodes
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white">{podcast.title}</h3>
          <p className="text-sm text-white/70">by {podcast.author}</p>
          <p className="text-sm text-white/60 line-clamp-2">{podcast.description}</p>
        </div>
      </GlassmorphicCard>
    </Link>
  );
};

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Amazing Podcasts
        </motion.h1>
        <motion.p 
          className="text-xl text-white/70 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Stream your favorite podcasts with our sleek, modern player featuring intuitive controls and beautiful visualizations.
        </motion.p>
      </section>
      
      {/* Featured Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Podcasts</h2>
          <Link href="/podcast" className="text-[#29F49A] hover:text-[#29F49A]/80 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPodcasts.slice(0, 3).map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PodcastCard podcast={podcast} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Technology', 'Science', 'Business', 'Arts', 'Health', 'History'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlassmorphicCard className="text-center py-4 cursor-pointer">
                <h3 className="font-medium">{category}</h3>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Recent Podcasts Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Podcasts</h2>
          <Link href="/podcast" className="text-[#29F49A] hover:text-[#29F49A]/80 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPodcasts.slice(3, 6).map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PodcastCard podcast={podcast} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
