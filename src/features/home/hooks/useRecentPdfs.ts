import { usePdf } from '../../../context/PdfContext';

export const useRecentPdfs = () => {
  const { recentPdfs, removePdf, renamePdf, clearAll } = usePdf();

  return {
    recentPdfs,
    removePdf,
    renamePdf,
    clearAll,
  };
};