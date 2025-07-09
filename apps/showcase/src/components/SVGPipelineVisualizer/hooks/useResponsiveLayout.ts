import { useState, useEffect, useCallback } from 'react';

export interface Breakpoints {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
  ultraWide: number;
}

export interface ResponsiveState {
  windowWidth: number;
  windowHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isUltraWide: boolean;
  breakpoint: 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'ultraWide';
  orientation: 'portrait' | 'landscape';
}

const defaultBreakpoints: Breakpoints = {
  mobile: 767,
  tablet: 1023,
  laptop: 1365,
  desktop: 1439,
  ultraWide: 1600,
};

export const useResponsiveLayout = (customBreakpoints?: Partial<Breakpoints>) => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  
  const getResponsiveState = useCallback((width: number, height: number): ResponsiveState => {
    const isMobile = width <= breakpoints.mobile;
    const isTablet = width > breakpoints.mobile && width <= breakpoints.tablet;
    const isLaptop = width > breakpoints.tablet && width <= breakpoints.laptop;
    const isDesktop = width > breakpoints.laptop && width <= breakpoints.desktop;
    const isUltraWide = width > breakpoints.desktop;
    
    let breakpoint: ResponsiveState['breakpoint'] = 'mobile';
    if (isUltraWide) breakpoint = 'ultraWide';
    else if (isDesktop) breakpoint = 'desktop';
    else if (isLaptop) breakpoint = 'laptop';
    else if (isTablet) breakpoint = 'tablet';
    
    return {
      windowWidth: width,
      windowHeight: height,
      isMobile,
      isTablet,
      isLaptop,
      isDesktop,
      isUltraWide,
      breakpoint,
      orientation: width > height ? 'landscape' : 'portrait',
    };
  }, [breakpoints]);

  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window !== 'undefined') {
      return getResponsiveState(window.innerWidth, window.innerHeight);
    }
    // Server-side fallback
    return getResponsiveState(1024, 768);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setState(getResponsiveState(window.innerWidth, window.innerHeight));
    };

    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedHandleResize);
    
    // Initial call to set correct state
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, [getResponsiveState]);

  // Layout helper functions
  const getLayoutConfig = useCallback(() => {
    const { breakpoint, windowWidth, windowHeight } = state;
    
    switch (breakpoint) {
      case 'mobile':
        return {
          layout: 'stack' as const,
          sidebarPosition: 'bottom' as const,
          cardColumns: 1,
          spacing: 'compact' as const,
          headerHeight: 60,
          maxContentWidth: windowWidth - 32,
        };
      
      case 'tablet':
        return {
          layout: 'split' as const,
          sidebarPosition: 'right' as const,
          cardColumns: 1,
          spacing: 'normal' as const,
          headerHeight: 70,
          maxContentWidth: windowWidth - 64,
        };
      
      case 'laptop':
        return {
          layout: 'split' as const,
          sidebarPosition: 'right' as const,
          cardColumns: 1,
          spacing: 'comfortable' as const,
          headerHeight: 80,
          maxContentWidth: 1400,
        };
      
      case 'desktop':
        return {
          layout: 'split' as const,
          sidebarPosition: 'right' as const,
          cardColumns: 1,
          spacing: 'comfortable' as const,
          headerHeight: 80,
          maxContentWidth: 1600,
        };
      
      case 'ultraWide':
        return {
          layout: 'split' as const,
          sidebarPosition: 'right' as const,
          cardColumns: 1,
          spacing: 'spacious' as const,
          headerHeight: 90,
          maxContentWidth: 1800,
        };
      
      default:
        return {
          layout: 'stack' as const,
          sidebarPosition: 'bottom' as const,
          cardColumns: 1,
          spacing: 'normal' as const,
          headerHeight: 70,
          maxContentWidth: 1200,
        };
    }
  }, [state]);

  const shouldUseMobileLayout = state.isMobile || state.isTablet;
  const shouldUseCompactLayout = state.isMobile || state.isTablet;
  const shouldShowSidebar = !state.isMobile;

  return {
    ...state,
    layoutConfig: getLayoutConfig(),
    shouldUseMobileLayout,
    shouldUseCompactLayout,
    shouldShowSidebar,
    breakpoints,
  };
};