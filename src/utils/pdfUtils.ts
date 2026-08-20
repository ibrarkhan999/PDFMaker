import { generatePDF } from 'react-native-html-to-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const generatePdfFromHtml = async (
  html: string,
  fileName: string,
): Promise<string> => {
  try {
    const cleanFileName = fileName.replace(/\s+/g, '_');
    const options = {
      html,
      fileName: cleanFileName,
      directory: 'PDFMaker',
    };

    const pdf = await generatePDF(options);
    console.log('PDF generated at:', pdf.filePath);

    const newFilePath = await ReactNativeBlobUtil.MediaCollection.createMediafile(
      {
        name: `${cleanFileName}.pdf`,
        parentFolder: 'PDFMaker',
        mimeType: 'application/pdf',
      },
      'Download',
    );
    console.log('MediaStore file created:', newFilePath);

    await ReactNativeBlobUtil.MediaCollection.writeToMediafile(
      newFilePath,
      pdf.filePath,
    );
    console.log('Written to MediaStore');

    return newFilePath;
  } catch (error) {
    console.log('ERROR in pdfUtils:', error);
    throw error;
  }
};