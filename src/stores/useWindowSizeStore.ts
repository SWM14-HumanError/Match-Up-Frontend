import {create} from 'zustand';

export enum WindowSize {
  MOBILE = 768,
  TABLET = 860,
  DESKTOP = 1440,
}

export interface WindowSizeState {
  isMobile: boolean,
  windowSize: WindowSize
  setWindowSize: (by: WindowSize) => void
}

const useWindowSizeStore = create<WindowSizeState>((set) => ({
  isMobile: window.innerWidth <= WindowSize.MOBILE,
  windowSize: WindowSize.DESKTOP,
  setWindowSize: (windowSize) => set({windowSize, isMobile: window.innerWidth <= windowSize}),
}));

export function getWindowSize() {
  if (window.innerWidth <= WindowSize.MOBILE)
    return WindowSize.MOBILE;
  else if (window.innerWidth <= WindowSize.TABLET)
    return WindowSize.TABLET;
  else
    return WindowSize.DESKTOP;
}

export default useWindowSizeStore;