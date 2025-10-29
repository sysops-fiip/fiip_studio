'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

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
  const rafId = useRef<number | null>(null);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));

    setSliderPosition(newPosition);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      updateSliderPosition(e.clientX);
    });
  }, [updateSliderPosition]);

  const handleTouchStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      updateSliderPosition(e.touches[0].clientX);
    });
  }, [updateSliderPosition]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl cursor-col-resize select-none"
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
        className="absolute top-0 left-0 h-full w-full"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover absolute top-0 left-0"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 h-full w-1 bg-primary-500 transition-all duration-75 z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary-500 rounded-full shadow-glow-lg flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-white">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-white rounded-full"></div>
            <div className="w-1 h-4 bg-white rounded-full"></div>
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 text-white font-semibold text-sm bg-black/70 backdrop-blur-sm px-3 py-2 rounded z-10">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 text-white font-semibold text-sm bg-black/70 backdrop-blur-sm px-3 py-2 rounded z-10">
        {afterLabel}
      </div>
    </div>
  );
}
