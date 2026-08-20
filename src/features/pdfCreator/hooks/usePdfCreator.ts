import { useState, useCallback } from 'react';
import { PdfDocument } from '../types';

export const usePdfCreator = () => {
  const [document, setDocument] = useState<PdfDocument>({
    title: 'Untitled Document',
    pages: [
      {
        id: 'page-1',
        content: '',
      },
    ],
    pageSize: 'A4',
    orientation: 'portrait',
  });

  const [currentPage, setCurrentPage] = useState(0);

  const updateTitle = useCallback((title: string) => {
    setDocument(prev => ({ ...prev, title }));
  }, []);

  const updateContent = useCallback((content: string, pageIndex: number) => {
    setDocument(prev => {
      const pages = [...prev.pages];
      pages[pageIndex] = { ...pages[pageIndex], content };
      return { ...prev, pages };
    });
  }, []);

  const addPage = useCallback(() => {
    setDocument(prev => ({
      ...prev,
      pages: [
        ...prev.pages,
        {
          id: `page-${Date.now()}`,
          content: '',
        },
      ],
    }));
    setCurrentPage(prev => prev + 1);
  }, []);

  const removePage = useCallback((pageIndex: number) => {
    setDocument(prev => {
      const pages = prev.pages.filter((_, index) => index !== pageIndex);
      return { ...prev, pages };
    });
    setCurrentPage(prev => (prev > 0 ? prev - 1 : 0));
  }, []);

  const setPageSize = useCallback((size: 'A4' | 'Letter') => {
    setDocument(prev => ({ ...prev, pageSize: size }));
  }, []);

  const setOrientation = useCallback((orientation: 'portrait' | 'landscape') => {
    setDocument(prev => ({ ...prev, orientation }));
  }, []);

  return {
    document,
    currentPage,
    setCurrentPage,
    updateTitle,
    updateContent,
    addPage,
    removePage,
    setPageSize,
    setOrientation,
  };
};