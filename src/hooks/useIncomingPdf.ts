import {useEffect} from 'react';
import {NativeModules} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const {PdfIntentModule} = NativeModules;

export const useIncomingPdf = (onPdfReceived: (uri: string) => void) => {
  useEffect(() => {
    console.log('useIncomingPdf: hook mounted');

    const checkPendingPdf = async () => {
      try {
        if (PdfIntentModule) {
          const uri = await PdfIntentModule.getPendingPdf();
          console.log('Pending PDF:', uri);

          if (uri) {
            if (uri.startsWith('content://')) {
              try {
                const fileName = `shared_${Date.now()}.pdf`;
                const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
                await ReactNativeBlobUtil.fs.cp(uri, path);
                console.log('Copied to:', path);
                onPdfReceived(path);
              } catch (copyError) {
                console.log('Copy error:', copyError);
                onPdfReceived(uri);
              }
            } else {
              onPdfReceived(uri);
            }
          }
        }
      } catch (error) {
        console.log('Error checking pending PDF:', error);
      }
    };

    checkPendingPdf();

    const timer = setTimeout(checkPendingPdf, 3000);

    return () => {
      console.log('useIncomingPdf: cleanup');
      clearTimeout(timer);
    };
  }, [onPdfReceived]);
};
