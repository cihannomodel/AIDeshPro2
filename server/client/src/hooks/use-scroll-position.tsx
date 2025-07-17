import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// Store scroll positions for each route
const scrollPositions = new Map<string, number>();

export function useScrollPosition() {
  const [location] = useLocation();
  const previousLocation = useRef<string>('');

  useEffect(() => {
    // Save scroll position of previous route
    if (previousLocation.current) {
      scrollPositions.set(previousLocation.current, window.scrollY);
    }

    // Get stored scroll position for current route
    const savedPosition = scrollPositions.get(location) || 0;
    
    // Restore scroll position with a small delay
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: savedPosition,
        behavior: 'instant'
      });
    }, 50);

    // Update previous location reference
    previousLocation.current = location;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  // Also save scroll position on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      scrollPositions.set(location, window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location]);
}