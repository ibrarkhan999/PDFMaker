import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import ViewerHeader from '../components/ViewerHeader';
import ViewerSettingsPanel from '../components/ViewerSettingsPanel';
import { usePdfViewerSettings } from '../hooks/usePdfViewerSettings';
import { colors } from '../../../theme/colors';

type PdfViewerRouteProp = RouteProp<RootStackParamList, 'PdfViewer'>;

const PdfViewerScreen = () => {
  const route = useRoute<PdfViewerRouteProp>();
  const navigation = useNavigation();
  const { uri } = route.params;

  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const {
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
  } = usePdfViewerSettings();

  return (
    <View style={styles.container}>
      <ViewerHeader
        currentPage={currentPage}
        totalPages={totalPages}
        showPageNumber={showPageNumber}
        onBack={() => navigation.goBack()}
        onOpenSettings={() => setShowSettings(true)}
      />

      <Pdf
        source={{ uri }}
        style={styles.pdf}
        onError={error => {
          console.log('PDF error:', error);
        }}
        onLoadComplete={(numberOfPages) => {
          console.log('PDF loaded, pages:', numberOfPages);
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page) => {
          setCurrentPage(page);
        }}
        enablePaging={enablePaging}
        horizontal={horizontal}
        spacing={spacing}
        fitPolicy={fitPolicy}
        trustAllCerts={false}
      />

      <ViewerSettingsPanel
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        showPageNumber={showPageNumber}
        setShowPageNumber={setShowPageNumber}
        enablePaging={enablePaging}
        setEnablePaging={setEnablePaging}
        horizontal={horizontal}
        setHorizontal={setHorizontal}
        spacing={spacing}
        setSpacing={setSpacing}
        fitPolicy={fitPolicy}
        setFitPolicy={setFitPolicy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pdf: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});

export default PdfViewerScreen;