import { useState } from 'react';

export const usePdfViewerSettings = () => {
  const [showPageNumber, setShowPageNumber] = useState(true);
  const [enablePaging, setEnablePaging] = useState(true);
  const [horizontal, setHorizontal] = useState(false);
  const [spacing, setSpacing] = useState(10);
  const [fitPolicy, setFitPolicy] = useState(2);

  return {
    showPageNumber,
    setShowPageNumber,
    enablePaging,
    setEnablePaging,
    horizontal,
    setHorizontal,
    spacing,
    setSpacing,
    fitPolicy,
    setFitPolicy,
  };
};