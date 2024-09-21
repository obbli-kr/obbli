'use client';

import React, { useState, useEffect, useRef, TouchEvent } from 'react';

interface CarouselClientWrapperProps {
  children: React.ReactNode;
  itemCount: number;
}

const CarouselClientWrapper = ({
  children,
  itemCount,
}: CarouselClientWrapperProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [_, setTouchMove] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const speedRef = useRef<number>(50); // pixels per second

  const maxPosters = Math.min(itemCount);

  const animate = (time: number) => {
    if (
      lastTimeRef.current != null
      && contentRef.current
      && carouselRef.current
      && !isSwiping
    ) {
      const deltaTime = time - lastTimeRef.current;
      const itemWidth = 210 + 12; // 210px + 12px margin
      const totalWidth = itemWidth * maxPosters;

      setScrollPosition((prevPosition) => {
        const newPosition
          = prevPosition + ((speedRef.current * deltaTime) / 1000);
        if (newPosition >= totalWidth) {
          return newPosition - totalWidth;
        }
        return newPosition;
      });
    }
    lastTimeRef.current = time;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isPaused && !isSwiping) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isSwiping, animate]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsSwiping(true);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchMove(0);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setTouchMove(diff);

    setScrollPosition((prevPosition) => {
      let newPosition = prevPosition + diff;
      const totalWidth = (210 + 12) * maxPosters;

      if (newPosition < 0) {
        newPosition += totalWidth;
      } else if (newPosition >= totalWidth) {
        newPosition -= totalWidth;
      }

      return newPosition;
    });

    setTouchStart(currentTouch);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    const itemWidth = 210 + 12;
    const snapThreshold = itemWidth / 2;
    const mod = scrollPosition % itemWidth;

    if (Math.abs(mod) > snapThreshold) {
      setScrollPosition((prevPosition) => {
        const direction = mod > 0 ? 1 : -1;
        return prevPosition + ((itemWidth - Math.abs(mod)) * direction);
      });
    } else {
      setScrollPosition((prevPosition) => prevPosition - mod);
    }
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      ref={carouselRef}
      className='relative overflow-hidden'
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={contentRef}
        className='relative flex'
        style={{
          transform: `translate3d(-${ scrollPosition }px, 0, 0)`,
        }}
      >
        {childrenArray.slice(0, maxPosters).map((child, index) => (
          <div
            key={index}
            className='mx-3 h-[297px] w-[210px] shrink-0 shadow-lg'
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselClientWrapper;
