import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

interface AudioQualityControlProps {
  currentQuality: string;
  onQualityChange: (quality: string) => void;
}

const AudioQualityControl: React.FC<AudioQualityControlProps> = ({
  currentQuality,
  onQualityChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const qualities = [
    { label: 'Auto (Adaptive)', value: 'auto' },
    { label: 'High (256 kbps)', value: 'high' },
    { label: 'Medium (128 kbps)', value: 'medium' },
    { label: 'Low (64 kbps)', value: 'low' }
  ];
  
  const handleQualityChange = (quality: string) => {
    onQualityChange(quality);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiSettings className="mr-2" size={14} />
        {qualities.find(q => q.value === currentQuality)?.label || 'Auto'}
      </Button>
      
      {isOpen && (
        <motion.div 
          className="absolute right-0 bottom-full mb-2 w-48 z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <GlassmorphicCard className="p-2">
            <div className="text-sm font-medium mb-2 text-white/80">Audio Quality</div>
            <div className="space-y-1">
              {qualities.map((quality) => (
                <button
                  key={quality.value}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    currentQuality === quality.value 
                      ? 'bg-[#0072C6] text-white' 
                      : 'hover:bg-white/10 text-white/70'
                  }`}
                  onClick={() => handleQualityChange(quality.value)}
                >
                  {quality.label}
                </button>
              ))}
            </div>
          </GlassmorphicCard>
        </motion.div>
      )}
    </div>
  );
};

export default AudioQualityControl;
