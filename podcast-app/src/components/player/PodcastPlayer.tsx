import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';
import { FiSkipBack, FiSkipForward, FiVolume2, FiVolumeX } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

interface PodcastPlayerProps {
  audioUrl: string;
  title: string;
  author: string;
  coverImage?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  audioUrl,
  title,
  author,
  coverImage,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioPlayerRef = useRef(null);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  
  // Initialize WaveSurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(255, 255, 255, 0.3)',
        progressColor: '#29F49A',
        cursorColor: '#0072C6',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 2,
        responsive: true,
        normalize: true,
        partialRender: true,
      });
      
      wavesurferRef.current = wavesurfer;
      
      // Load audio file
      wavesurfer.load(audioUrl);
      
      // Events
      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration());
      });
      
      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });
      
      wavesurfer.on('seek', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });
      
      return () => {
        wavesurfer.destroy();
      };
    }
  }, [audioUrl]);
  
  // Sync WaveSurfer with AudioPlayer
  useEffect(() => {
    if (wavesurferRef.current && audioPlayerRef.current) {
      const wavesurfer = wavesurferRef.current;
      const audioPlayer = audioPlayerRef.current.audio.current;
      
      const handleTimeUpdate = () => {
        const currentTime = audioPlayer.currentTime;
        const progress = currentTime / audioPlayer.duration;
        
        if (!wavesurfer.isPlaying()) {
          wavesurfer.seekTo(progress);
        }
      };
      
      audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
      
      return () => {
        audioPlayer.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);
  
  // Handle play/pause
  useEffect(() => {
    if (wavesurferRef.current) {
      const wavesurfer = wavesurferRef.current;
      
      if (isPlaying) {
        wavesurfer.play();
      } else {
        wavesurfer.pause();
      }
    }
  }, [isPlaying]);
  
  // Handle volume change
  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume);
    }
  }, [volume]);
  
  // Handle playback rate change
  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);
  
  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <GlassmorphicCard className="p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <div className="w-full md:w-1/4 lg:w-1/6">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
            {coverImage && (
              <img 
                src={coverImage} 
                alt={`${title} cover`} 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0072C6]/30 to-[#29F49A]/30" />
          </div>
        </div>
        
        <div className="w-full md:w-3/4 lg:w-5/6 space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-white/70">{author}</p>
          
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/60">Speed:</span>
              <select 
                className="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 rounded-full ${volume === 0 ? 'bg-white/20' : 'bg-white/10'}`}
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
              >
                {volume === 0 ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-[#29F49A]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div ref={waveformRef} className="w-full"></div>
        
        <div className="flex justify-between text-sm text-white/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <AudioPlayer
          ref={audioPlayerRef}
          src={audioUrl}
          showJumpControls={true}
          showSkipControls={true}
          showFilledVolume={false}
          showFilledProgress={true}
          showDownloadProgress={false}
          layout="stacked-reverse"
          customProgressBarSection={[]}
          customControlsSection={["MAIN_CONTROLS"]}
          autoPlayAfterSrcChange={false}
          autoPlay={false}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onClickPrevious={() => {
            // Handle previous episode
            console.log("Previous episode");
          }}
          onClickNext={() => {
            // Handle next episode
            console.log("Next episode");
          }}
          customIcons={{
            previous: <FiSkipBack size={20} />,
            next: <FiSkipForward size={20} />,
          }}
          className="podcast-player"
        />
      </div>
    </GlassmorphicCard>
  );
};

export default PodcastPlayer;
