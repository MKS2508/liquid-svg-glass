import { useState, useCallback, useRef } from 'react';

interface AnimationState {
  isAnimating: boolean;
  activeNodeIndex: number | null;
  completedNodes: Set<number>;
  animationSpeed: number;
}

export const useAnimationState = (totalNodes: number) => {
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    activeNodeIndex: null,
    completedNodes: new Set(),
    animationSpeed: 1,
  });

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAnimating: true,
      activeNodeIndex: 0,
      completedNodes: new Set(),
    }));

    let currentIndex = 0;
    const baseDelay = 2000 / state.animationSpeed;

    const animateNext = () => {
      if (currentIndex < totalNodes) {
        setState(prev => ({
          ...prev,
          activeNodeIndex: currentIndex,
          completedNodes: currentIndex > 0 
            ? new Set([...prev.completedNodes, currentIndex - 1])
            : prev.completedNodes,
        }));
        
        currentIndex++;
        animationTimeoutRef.current = setTimeout(animateNext, baseDelay);
      } else {
        setState(prev => ({
          ...prev,
          completedNodes: new Set([...prev.completedNodes, totalNodes - 1]),
          activeNodeIndex: null,
          isAnimating: false,
        }));
      }
    };

    animateNext();
  }, [totalNodes, state.animationSpeed]);

  const resetAnimation = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setState({
      isAnimating: false,
      activeNodeIndex: null,
      completedNodes: new Set(),
      animationSpeed: state.animationSpeed,
    });
  }, [state.animationSpeed]);

  const setAnimationSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, animationSpeed: speed }));
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  }, []);

  return {
    ...state,
    startAnimation,
    resetAnimation,
    setAnimationSpeed,
    cleanup,
  };
};