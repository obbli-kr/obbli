'use client';

import React, { useState, useEffect, useRef, TouchEvent, useCallback } from 'react';

interface CarouselClientWrapperProps {
  children: React.ReactNode;
  itemCount: number;
  itemWidth: number;
}

const revolveSpeed = 1; // 2px/s

const CarouselClientWrapper = ({ children, itemWidth }: CarouselClientWrapperProps) => {
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // 무한 스크롤을 위한 children 복제 (pc 크기상 2개면 충분)
  const [childrenArray, setChildrenArray] = useState(React.Children.toArray(children));
  const itemCount = childrenArray.length;
  const scrollPosition = time;

  const animate = useCallback((timeStamp: number) => {
    setTime((time) => time + revolveSpeed);
    animationFrameRef.current = requestAnimationFrame(animate);
    console.log(timeStamp);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    if (scrollPosition && scrollPosition % itemWidth === 0) {
      setChildrenArray((prev) => [...prev.slice(1), prev[0]]);
      setTime((time) => time - itemWidth);
    }
  }, [scrollPosition, itemWidth, itemCount]);

  return (
    <div
      className='relative overflow-hidden'
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      role="region"
      aria-label="이미지 캐러셀(슬라이드)"
      ref={containerRef}
    >
      <div
        className='relative flex'
        style={{
          transform: `translateX(-${ scrollPosition }px)`,
        }}
      >
        {childrenArray.map((child, index) => (
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
