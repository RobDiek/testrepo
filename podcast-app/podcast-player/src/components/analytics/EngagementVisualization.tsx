import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiShare2, FiDownload, FiClock } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const EngagementVisualization = ({ episodeId }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock engagement data
  const engagementData = {
    listenerRetention: [
      { position: 0, retention: 1.0 },
      { position: 0.1, retention: 0.92 },
      { position: 0.2, retention: 0.85 },
      { position: 0.3, retention: 0.81 },
      { position: 0.4, retention: 0.78 },
      { position: 0.5, retention: 0.75 },
      { position: 0.6, retention: 0.71 },
      { position: 0.7, retention: 0.65 },
      { position: 0.8, retention: 0.58 },
      { position: 0.9, retention: 0.48 },
      { position: 1.0, retention: 0.35 },
    ],
    engagementPoints: [
      { position: 0.12, type: 'peak', value: 0.95, label: 'Introduction' },
      { position: 0.27, type: 'peak', value: 0.88, label: 'Key topic 1' },
      { position: 0.45, type: 'drop', value: 0.72, label: 'Technical discussion' },
      { position: 0.63, type: 'peak', value: 0.78, label: 'Key topic 2' },
      { position: 0.82, type: 'drop', value: 0.55, label: 'Sponsor message' },
      { position: 0.95, type: 'peak', value: 0.60, label: 'Conclusion' },
    ],
    interactions: {
      shares: [
        { position: 0.15, count: 28 },
        { position: 0.35, count: 42 },
        { position: 0.65, count: 31 },
        { position: 0.85, count: 19 },
      ],
      downloads: [
        { position: 0.05, count: 65 },
        { position: 0.25, count: 38 },
        { position: 0.55, count: 27 },
        { position: 0.75, count: 18 },
        { position: 0.95, count: 42 },
      ],
    },
    heatmap: Array(20).fill(0).map((_, i) => ({
      segment: i,
      intensity: Math.random() * 0.7 + 0.3, // Random value between 0.3 and 1.0
    })),
  };

  // Render the retention curve
  const renderRetentionCurve = () => {
    const width = 100;
    const height = 100;
    const points = engagementData.listenerRetention.map(point => 
      `${point.position * width},${(1 - point.retention) * height}`
    ).join(' ');

    return (
      <div className="relative h-32 w-full">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {/* Gradient fill under the curve */}
          <defs>
            <linearGradient id="retentionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#29F49A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#29F49A" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Area under the curve */}
          <path 
            d={`M0,${height} ${points} ${width},${height} Z`} 
            fill="url(#retentionGradient)" 
          />
          
          {/* The curve itself */}
          <polyline
            points={points}
            fill="none"
            stroke="#29F49A"
            strokeWidth="2"
          />
          
          {/* Engagement points */}
          {engagementData.engagementPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.position * width}
              cy={(1 - point.value) * height}
              r="3"
              fill={point.type === 'peak' ? '#0072C6' : '#FF4560'}
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/50">
          <span>Start</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>End</span>
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute top-0 bottom-8 left-0 flex flex-col justify-between text-xs text-white/50">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>
      </div>
    );
  };

  // Render the heatmap
  const renderHeatmap = () => {
    return (
      <div className="w-full h-12 flex">
        {engagementData.heatmap.map((segment, index) => (
          <div 
            key={index}
            className="flex-1 h-full"
            style={{ 
              background: `rgba(41, 244, 154, ${segment.intensity})`,
              borderRight: index < engagementData.heatmap.length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
            }}
            title={`Segment ${index + 1}: ${Math.round(segment.intensity * 100)}% engagement`}
          />
        ))}
      </div>
    );
  };

  // Render interaction markers
  const renderInteractions = () => {
    return (
      <div className="relative h-16 w-full mt-2">
        <div className="absolute inset-0">
          {/* Share interactions */}
          {engagementData.interactions.shares.map((share, index) => (
            <div 
              key={`share-${index}`}
              className="absolute flex flex-col items-center"
              style={{ 
                left: `${share.position * 100}%`, 
                top: '0',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="p-1 rounded-full bg-[#0072C6]/20 text-[#0072C6]">
                <FiShare2 size={12} />
              </div>
              <span className="text-xs text-white/60 mt-1">{share.count}</span>
            </div>
          ))}
          
          {/* Download interactions */}
          {engagementData.interactions.downloads.map((download, index) => (
            <div 
              key={`download-${index}`}
              className="absolute flex flex-col items-center"
              style={{ 
                left: `${download.position * 100}%`, 
                bottom: '0',
                transform: 'translateX(-50%)'
              }}
            >
              <span className="text-xs text-white/60 mb-1">{download.count}</span>
              <div className="p-1 rounded-full bg-[#29F49A]/20 text-[#29F49A]">
                <FiDownload size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <GlassmorphicCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Listener Engagement</h3>
        <div className="flex items-center text-white/60 text-sm">
          <FiClock className="mr-2" size={14} />
          Last 30 days
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#29F49A] mb-4"></div>
          <p className="text-white/70">Loading engagement data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Listener Retention</h4>
            {renderRetentionCurve()}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Engagement Heatmap</h4>
            <div className="space-y-2">
              {renderHeatmap()}
              <div className="flex justify-between text-xs text-white/50">
                <span>Start</span>
                <span>End</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Listener Interactions</h4>
            {renderInteractions()}
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80">Key Engagement Points</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {engagementData.engagementPoints.map((point, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg flex items-center ${
                    point.type === 'peak' 
                      ? 'bg-[#0072C6]/10 border border-[#0072C6]/20' 
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  <div 
                    className={`p-2 rounded-full mr-3 ${
                      point.type === 'peak' 
                        ? 'bg-[#0072C6]/20 text-[#0072C6]' 
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {point.type === 'peak' ? <FiPlay size={14} /> : <FiPause size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{point.label}</p>
                    <p className="text-xs text-white/60">
                      {point.type === 'peak' ? 'High engagement' : 'Drop-off point'} at {Math.round(point.position * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </GlassmorphicCard>
  );
};

export default EngagementVisualization;
