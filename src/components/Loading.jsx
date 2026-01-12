import { useEffect } from 'react';

function Loading({ isLoading, setIsLoading }) {
  useEffect(() => {
    const images = document.querySelectorAll('img');
    const totalImages = images.length;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    if (totalImages === 0) {
      clearTimeout(timeout);
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;

      if (loadedCount >= totalImages) {
        clearTimeout(timeout);
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress);
      }
    });

    return () => {
      clearTimeout(timeout);
      images.forEach((img) => {
        img.removeEventListener('load', updateProgress);
        img.removeEventListener('error', updateProgress);
      });
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-mask">
      <div className="loading-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
