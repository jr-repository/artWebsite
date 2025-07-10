import React from 'react';

interface AnimatedStarsProps {
  count?: number;
  className?: string;
}

const AnimatedStars: React.FC<AnimatedStarsProps> = ({ count = 50, className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        >
          <div
            className="bg-white rounded-full opacity-70"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        </div>
      ))}
      
      {/* Moving stars */}
      {Array.from({ length: count / 5 }).map((_, i) => (
        <div
          key={`moving-${i}`}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 6}s`,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white opacity-80"
          >
            <path
              d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
      
      {/* Floating particles */}
      {Array.from({ length: count / 3 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute bg-gradient-to-r from-white/20 to-white/40 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedStars;