import React, { useEffect, useCallback, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { PdfProvider } from './src/context/PdfContext';
import { SettingsProvider } from './src/context/SettingsContext';
import Toast from './src/components/Toast/Toast';
import { useIncomingPdf } from './src/hooks/useIncomingPdf';
import { RootStackParamList } from './src/navigation/types';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const App = () => {
  const [incomingPdf, setIncomingPdf] = useState<string | null>(null);

  const handlePdfReceived = useCallback((uri: string) => {
    setIncomingPdf(uri);
  }, []);

  useIncomingPdf(handlePdfReceived);

  useEffect(() => {
    console.log('App: incomingPdf changed to:', incomingPdf);

    if (!incomingPdf) return;

    const tryNavigate = () => {
      const ready = navigationRef.isReady();
      console.log('tryNavigate - navigationRef ready?', ready);

      if (ready) {
        console.log('Navigating to PdfViewer with:', incomingPdf);
        navigationRef.navigate('PdfViewer', { uri: incomingPdf });
        setIncomingPdf(null);
      } else {
        setTimeout(tryNavigate, 200);
      }
    };

    tryNavigate();
  }, [incomingPdf]);

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <PdfProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
          <Toast />
        </PdfProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
};

export default App;