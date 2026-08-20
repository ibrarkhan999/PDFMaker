import { useState, useCallback } from 'react';
import { ImageItem } from '../types';

export const useImagesToPdf = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [documentTitle, setDocumentTitle] = useState('Untitled Images PDF');

  const addImages = useCallback((uris: string[]) => {
    const newImages = uris.map(uri => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      uri,
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const moveImage = useCallback((index: number, direction: 'up' | 'down') => {
    setImages(prev => {
      const newImages = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (targetIndex < 0 || targetIndex >= newImages.length) {
        return prev;
      }
      
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      return newImages;
    });
  }, []);

  const rotateImage = useCallback((id: string) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, rotation: ((img.rotation || 0) + 90) % 360 } : img,
      ),
    );
  }, []);

  const updateTitle = useCallback((title: string) => {
    setDocumentTitle(title);
  }, []);

  return {
    images,
    documentTitle,
    addImages,
    removeImage,
    moveImage,
    rotateImage,
    updateTitle,
  };
};