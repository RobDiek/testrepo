import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiCalendar, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

// Mock data for podcast details
const mockPodcast = {
  id: 1,
  title: 'Tech Talk Today',
  author: 'Sarah Johnson',
  category: 'Technology',
  description: 'The latest in tech news and interviews with industry leaders. Join Sarah Johnson as she explores cutting-edge technologies, interviews tech innovators, and breaks down complex tech concepts into digestible insights. Whether you\'re a tech enthusiast or industry professional, this podcast offers valuable perspectives on the rapidly evolving world of technology.',
  coverImage: '/placeholder-cover-1.jpg',
  episodes: [
    {
      id: 101,
      title: 'The Future of AI in Everyday Life',
      description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society.',
      duration: '42:18',
      date: 'Mar 10, 2025',
    },
    {
      id: 102,
      title: 'Blockchain Beyond Cryptocurrency',
      description: 'Examining the practical applications of blockchain technology outside of digital currencies.',
      duration: '38:45',
      date: 'Mar 3, 2025',
    },
    {
      id: 103,
      title: 'The Rise of Quantum Computing',
      description: 'Understanding quantum computing and its potential to revolutionize data processing and security.',
      duration: '45:22',
      date: 'Feb 25, 2025',
    },
    {
      id: 104,
      title: 'Ethical Considerations in Tech Development',
      description: 'Discussing the ethical responsibilities of tech companies and developers in creating new technologies.',
      duration: '51:07',
      date: 'Feb 18, 2025',
    },
    {
      id: 105,
      title: 'The Evolution of User Experience Design',
      description: 'Tracing the development of UX design principles and their impact on modern technology.',
      duration: '36:54',
      date: 'Feb 11, 2025',
    },
  ],
};

const EpisodeCard = ({ episode }) => {
  return (
    <GlassmorphicCard className="cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
          <p className="text-sm text-white/70 mb-3 line-clamp-2">{episode.description}</p>
          <div className="flex items-center text-xs text-white/60 space-x-4">
            <span className="flex items-center">
              <FiClock className="mr-1" size={12} />
              {episode.duration}
            </span>
            <span className="flex items-center">
              <FiCalendar className="mr-1" size={12} />
              {episode.date}
            </span>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center ml-4">
          <FiPlay className="ml-0.5" />
        </Button>
      </div>
    </GlassmorphicCard>
  );
};

export default function PodcastDetail() {
  return (
    <div className="space-y-8">
      <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6">
        <FiArrowLeft className="mr-2" /> Back to podcasts
      </Link>
      
      {/* Podcast Header */}
      <section className="mb-8">
        <GlassmorphicCard className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0072C6]/30 to-[#29F49A]/30 z-10" />
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80">
                  {mockPodcast.category}
                </span>
                <span className="text-sm text-white/60 flex items-center">
                  <FiClock className="mr-1" size={14} />
                  {mockPodcast.episodes.length} episodes
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{mockPodcast.title}</h1>
              <p className="text-lg text-white/80">by {mockPodcast.author}</p>
              <p className="text-white/70">{mockPodcast.description}</p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="primary" size="md" className="flex items-center">
                  <FiPlay className="mr-2" /> Play Latest
                </Button>
                <Button variant="outline" size="md" className="flex items-center">
                  <FiShare2 className="mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </section>
      
      {/* Episodes List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Episodes</h2>
        <div className="space-y-4">
          {mockPodcast.episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/podcast/${mockPodcast.id}/episode/${episode.id}`}>
                <EpisodeCard episode={episode} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
