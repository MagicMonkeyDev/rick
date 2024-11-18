import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Terminal from './components/Terminal'; // Your existing terminal component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="app">
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <Terminal /> // Your existing terminal component
      )}
    </div>
  );
};

export default App; 