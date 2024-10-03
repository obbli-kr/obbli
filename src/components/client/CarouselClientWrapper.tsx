'use client';

import React, { useState, useEffect, useRef, TouchEvent, useCallback } from 'react';

interface CarouselClientWrapperProps {
  children: React.ReactNode;
  itemCount: number;
  itemWidth: number;
}

const CarouselClientWrapper = ({ children, itemCount, itemWidth }: CarouselClientWrapperProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const touchMoveRef = useRef<number>(0);

  // 무한 스크롤을 위한 children 복제 (pc 크기상 2개면 충분)
  const childrenArray = React.Children.toArray(children);
  const duplicatedChildren = [...childrenArray, ...childrenArray];

  // 애니메이션 함수
  const animate = useCallback((time: number) => {
    if (lastTimeRef.current != null && !isPaused) {
      const deltaTime = time - lastTimeRef.current;
      const totalWidth = itemWidth * itemCount;

      setScrollPosition((prevPosition) => {
        const speed = 100; // 100px/s
        const newPosition = (prevPosition + ((speed * deltaTime) / 1000)) % totalWidth;
        return newPosition >= 0 ? newPosition : newPosition + totalWidth;
      });
    }
    lastTimeRef.current = time;
    animationRef.current = requestAnimationFrame(animate);
  }, [itemCount, itemWidth, isPaused]);

  // 애니메이션 시작/중지 함수
  const startAnimation = useCallback(() => {
    if (!animationRef.current) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    // 모바일에서 포스터 클릭으로 링크 들어갔다가 뒤로가기하면 애니메이션이 멈추는 문제 해결
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        setIsPaused(false);
        startAnimation();
      }
    };

    const handlePopState = () => {
      setIsPaused(false);
      startAnimation();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);

    startAnimation();

    return () => {
      stopAnimation();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [startAnimation, stopAnimation]);

  useEffect(() => {
    if (isPaused) {
      stopAnimation();
    } else {
      startAnimation();
    }
    return () => {
      stopAnimation();
    };
  }, [isPaused, startAnimation, stopAnimation]);

  // 터치 이벤트 핸들러(모바일)
  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
    touchMoveRef.current = 0;
  }, []);

  const startTouchPosition = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const currentTouchPosition = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouchPosition;
    touchMoveRef.current = diff;

    setScrollPosition((prevPosition) => {
      let newPosition = prevPosition + diff;
      const totalWidth = (210 + 24) * itemCount;

      if (newPosition < 0) {
        newPosition += totalWidth;
      } else if (newPosition >= totalWidth) {
        newPosition -= totalWidth;
      }

      return newPosition;
    });

    setTouchStart(currentTouchPosition);
  }, [touchStart, itemCount]);

  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
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
  }, [itemWidth, scrollPosition]);

  return (
    <div
      className='relative overflow-hidden'
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={startTouchPosition}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="이미지 캐러셀(슬라이드)"
    >
      <div
        className='relative flex'
        style={{
          transform: `translateX(-${ scrollPosition }px)`,
        }}
      >
        {duplicatedChildren.map((child, index) => (
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
