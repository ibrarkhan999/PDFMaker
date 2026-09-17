import { useEffect, useRef } from 'react';
import { NativeModules, NativeEventEmitter, DeviceEventEmitter } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const { PdfIntentModule } = NativeModules;

export const useIncomingPdf = (onPdfReceived: (uri: string) => void) => {
  const onPdfReceivedRef = useRef(onPdfReceived);
  onPdfReceivedRef.current = onPdfReceived;

  useEffect(() => {
    console.log('useIncomingPdf: hook mounted');

    const processUri = async (uri: string) => {
      console.log('Processing PDF URI:', uri);
      
      if (uri.startsWith('content://')) {
        try {
          const fileName = `shared_${Date.now()}.pdf`;
          const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
          await ReactNativeBlobUtil.fs.cp(uri, path);
          console.log('Copied to:', path);
          onPdfReceivedRef.current(path);
        } catch (copyError) {
          console.log('Copy error:', copyError);
          onPdfReceivedRef.current(uri);
        }
      } else {
        onPdfReceivedRef.current(uri);
      }
    };

    const checkPendingPdf = async () => {
      try {
        if (PdfIntentModule) {
          const uri = await PdfIntentModule.getPendingPdf();
          console.log('Pending PDF:', uri);
          if (uri) {
            await processUri(uri);
          }
        }
      } catch (error) {
        console.log('Error checking pending PDF:', error);
      }
    };

    checkPendingPdf();

    // Listen for new intents while app is running
    const subscription = DeviceEventEmitter.addListener('onPdfIntent', (uri: string) => {
      console.log('onPdfIntent event:', uri);
      processUri(uri);
    });

    return () => {
      console.log('useIncomingPdf: cleanup');
      subscription.remove();
    };
  }, []);
};