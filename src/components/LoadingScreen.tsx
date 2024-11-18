import * as React from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  React.useEffect(() => {
    const unmountLoading = gsap.timeline({ paused: true });
    unmountLoading.to(
      '#loading-container',
      {
        scale: 5,
        opacity: 0,
        duration: 0.2,
        onComplete: onLoadingComplete
      },
      0
    );

    const logoTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        unmountLoading.play();
      },
    });

    // ... existing animation timeline code ...
    logoTl.play();
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      {/* SVG code from your example */}
    </div>
  );
};

export default LoadingScreen; 