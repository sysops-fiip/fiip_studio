'use client';

import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="w-full h-auto block"
        draggable={false}
      />

      {/* After Image - Clipped */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%` }}
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 h-full w-1 bg-primary-500 transition-all"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary-500 rounded-full shadow-glow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-white rounded-full"></div>
            <div className="w-1 h-4 bg-white rounded-full"></div>
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 text-white font-semibold text-sm bg-black/50 px-3 py-2 rounded">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 text-white font-semibold text-sm bg-black/50 px-3 py-2 rounded">
        {afterLabel}
      </div>
    </div>
  );
}
