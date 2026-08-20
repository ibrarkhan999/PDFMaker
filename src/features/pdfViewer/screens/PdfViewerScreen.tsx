import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types';

type PdfViewerRouteProp = RouteProp<RootStackParamList, 'PdfViewer'>;

const PdfViewerScreen = () => {
  const route = useRoute<PdfViewerRouteProp>();
  const {uri} = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri}}
        style={styles.pdf}
        onError={error => {
          console.log('PDF error:', error);
        }}
        onLoadComplete={numberOfPages => {
          console.log('PDF loaded, pages:', numberOfPages);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
  },
});

export default PdfViewerScreen;
