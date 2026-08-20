import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PdfItem = {
  id: string;
  name: string;
  uri: string;
  createdAt: string;
  pageCount?: number;
};

type PdfContextType = {
  recentPdfs: PdfItem[];
  addPdf: (pdf: PdfItem) => void;
  removePdf: (id: string) => void;
  renamePdf: (id: string, newName: string) => void;
  clearAll: () => void;
};

const PdfContext = createContext<PdfContextType | undefined>(undefined);

export const PdfProvider = ({ children }: { children: ReactNode }) => {
  const [recentPdfs, setRecentPdfs] = useState<PdfItem[]>([]);

  const addPdf = (pdf: PdfItem) => {
    setRecentPdfs(prev => [pdf, ...prev]);
  };

  const removePdf = (id: string) => {
    setRecentPdfs(prev => prev.filter(item => item.id !== id));
  };

  const renamePdf = (id: string, newName: string) => {
    setRecentPdfs(prev =>
      prev.map(item =>
        item.id === id ? { ...item, name: newName } : item,
      ),
    );
  };

  const clearAll = () => {
    setRecentPdfs([]);
  };

  return (
    <PdfContext.Provider value={{ recentPdfs, addPdf, removePdf, renamePdf, clearAll }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error('usePdf must be used within PdfProvider');
  }
  return context;
};