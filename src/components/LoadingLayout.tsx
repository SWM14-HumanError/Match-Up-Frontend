import React from 'react';
import LoadingComponent from './LoadingComponent.tsx';

interface ILoadingLayout {
  isLoading: boolean;
  children: React.ReactNode;
}

function LoadingLayout({isLoading=true, children}: ILoadingLayout) {
  return isLoading ? ( <LoadingComponent/> ) : ( <>{children}</> );
}

export default LoadingLayout;