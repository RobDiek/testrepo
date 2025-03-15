import React, { useState } from 'react';
import PodcastPlayer from '@/components/player/PodcastPlayer';
import AudioQualityControl from '@/components/player/AudioQualityControl';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';
import { FiList, FiClock, FiDownload, FiShare2 } from 'react-icons/fi';

interface AudioPlayerContainerProps {
  episode: {
    id: number;
    title: string;
    author: string;
    audioUrl: string;
    duration: string;
    coverImage?: string;
  };
  onNext?: () => void;
  onPrevious?: () => void;
}

const AudioPlayerContainer: React.FC<AudioPlayerContainerProps> = ({
  episode,
  onNext,
  onPrevious
}) => {
  const [audioQuality, setAudioQuality] = useState('auto');
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  // Function to get the appropriate audio URL based on quality
  const getAudioUrl = (baseUrl: string, quality: string) => {
    if (quality === 'auto') {
      return baseUrl; // The player will handle adaptive streaming
    }
    
    // In a real app, you would have different quality versions available
    // For this demo, we'll just return the same URL
    return baseUrl;
  };
  
  return (
    <div className="space-y-4">
      <PodcastPlayer 
        audioUrl={getAudioUrl(episode.audioUrl, audioQuality)}
        title={episode.title}
        author={episode.author}
        coverImage={episode.coverImage}
      />
      
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowPlaylist(!showPlaylist)}
          >
            <FiList className="mr-2" size={14} />
            Playlist
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <FiClock className="mr-2" size={14} />
            Sleep Timer
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <FiDownload className="mr-2" size={14} />
            Download
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <FiShare2 className="mr-2" size={14} />
            Share
          </Button>
          
          <AudioQualityControl 
            currentQuality={audioQuality}
            onQualityChange={setAudioQuality}
          />
        </div>
      </div>
      
      {showPlaylist && (
        <GlassmorphicCard className="p-4">
          <h3 className="text-lg font-semibold mb-3">Up Next</h3>
          <div className="space-y-2">
            <div className="p-3 bg-white/5 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Current: {episode.title}</p>
                <p className="text-sm text-white/60">{episode.duration}</p>
              </div>
              <div className="text-[#29F49A]">Playing</div>
            </div>
            
            {/* This would be populated with actual episodes in a real app */}
            <div className="p-3 hover:bg-white/5 rounded-lg cursor-pointer">
              <p className="font-medium">Next Episode Title</p>
              <p className="text-sm text-white/60">45:30</p>
            </div>
            
            <div className="p-3 hover:bg-white/5 rounded-lg cursor-pointer">
              <p className="font-medium">Another Episode Title</p>
              <p className="text-sm text-white/60">38:15</p>
            </div>
          </div>
        </GlassmorphicCard>
      )}
    </div>
  );
};

export default AudioPlayerContainer;
