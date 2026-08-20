import React, { useEffect, useCallback, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RootNavigator from './src/navigation/RootNavigator';
import { PdfProvider } from './src/context/PdfContext';
import { SettingsProvider } from './src/context/SettingsContext';
import Toast from './src/components/Toast/Toast';
import { useIncomingPdf } from './src/hooks/useIncomingPdf';
import { RootStackParamList } from './src/navigation/types';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const App = () => {
  const [incomingPdf, setIncomingPdf] = useState<string | null>(null);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      const result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        await request(permission);
      }
    }
  };

  const handlePdfReceived = useCallback((uri: string) => {
    console.log('PDF received:', uri);
    setIncomingPdf(uri);
  }, []);

  useIncomingPdf(handlePdfReceived);

  useEffect(() => {
    if (incomingPdf && navigationRef.isReady()) {
      navigationRef.navigate('PdfViewer', { uri: incomingPdf });
      setIncomingPdf(null);
    }
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