import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiDownload, FiShare2, FiVolume2, FiClock, FiCalendar } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';
import AudioPlayerContainer from '@/components/player/AudioPlayerContainer';

// Mock data for episode details
const mockEpisode = {
  id: 101,
  podcastId: 1,
  podcastTitle: 'Tech Talk Today',
  title: 'The Future of AI in Everyday Life',
  description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society. In this episode, we discuss the latest advancements in AI technology and how they are transforming various aspects of our lives, from smart homes to healthcare, transportation, and beyond. We also explore the ethical implications and potential challenges that arise as AI becomes more prevalent in our daily interactions.',
  duration: '42:18',
  date: 'Mar 10, 2025',
  audioUrl: 'https://ia800905.us.archive.org/19/items/future-of-ai/future-of-ai.mp3', // Example URL
  coverImage: '/placeholder-cover-1.jpg',
  shownotes: `
    <h3>Show Notes</h3>
    <p>In this episode, we covered:</p>
    <ul>
      <li>The evolution of AI assistants in smart homes</li>
      <li>How AI is transforming healthcare diagnostics</li>
      <li>The role of machine learning in personalized recommendations</li>
      <li>Ethical considerations around AI decision-making</li>
      <li>The future of AI in autonomous vehicles</li>
    </ul>
    
    <h3>Resources Mentioned</h3>
    <ul>
      <li>AI Ethics Guidelines by the IEEE</li>
      <li>"Artificial Intelligence: A Modern Approach" by Stuart Russell and Peter Norvig</li>
      <li>Stanford's Human-Centered AI Institute</li>
    </ul>
    
    <h3>Guest Information</h3>
    <p>Dr. Maya Patel - AI Research Scientist at TechFuture Labs</p>
  `,
};

export default function EpisodeDetail() {
  return (
    <div className="space-y-8">
      <Link href={`/podcast/${mockEpisode.podcastId}`} className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6">
        <FiArrowLeft className="mr-2" /> Back to {mockEpisode.podcastTitle}
      </Link>
      
      {/* Episode Header */}
      <section className="mb-8">
        <GlassmorphicCard className="p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-white/60 flex items-center">
                <FiClock className="mr-1" size={14} />
                {mockEpisode.duration}
              </span>
              <span className="text-sm text-white/60 flex items-center ml-4">
                <FiCalendar className="mr-1" size={14} />
                {mockEpisode.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold">{mockEpisode.title}</h1>
            <p className="text-lg text-white/80">Episode of {mockEpisode.podcastTitle}</p>
            <p className="text-white/70">{mockEpisode.description}</p>
          </div>
        </GlassmorphicCard>
      </section>
      
      {/* Audio Player */}
      <section className="mb-8">
        <AudioPlayerContainer 
          episode={{
            id: mockEpisode.id,
            title: mockEpisode.title,
            author: mockEpisode.podcastTitle,
            audioUrl: mockEpisode.audioUrl,
            duration: mockEpisode.duration,
            coverImage: mockEpisode.coverImage
          }}
        />
      </section>
      
      {/* Show Notes */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Show Notes</h2>
        <GlassmorphicCard className="p-6">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: mockEpisode.shownotes }}
          />
        </GlassmorphicCard>
      </section>
    </div>
  );
}
