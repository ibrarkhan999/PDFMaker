import { useState, useCallback } from 'react';
import { TextDocument } from '../types';

export const useTextToPdf = () => {
  const [document, setDocument] = useState<TextDocument>({
    title: 'Untitled Document',
    pages: [
      {
        id: 'page-1',
        content: '',
      },
    ],
  });

  const updateTitle = useCallback((title: string) => {
    setDocument(prev => ({ ...prev, title }));
  }, []);

  const updateContent = useCallback((content: string) => {
    setDocument(prev => {
      const pages = [...prev.pages];
      pages[0] = { ...pages[0], content };
      return { ...prev, pages };
    });
  }, []);

  return {
    document,
    updateTitle,
    updateContent,
  };
};