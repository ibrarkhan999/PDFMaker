import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { usePdfCreator } from '../hooks/usePdfCreator';
import { generatePdfFromHtml } from '../../../utils/pdfUtils';
import { usePdf } from '../../../context/PdfContext';
import { showToast } from '../../../components/Toast';
import { RootStackParamList } from '../../../navigation/types';
import WebEditor from '../components/WebEditor';
import PageTabs from '../components/PageTabs';
import RenameModal from '../components/RenameModal';
import ExportButton from '../components/ExportButton';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type PdfCreatorNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PdfCreator'>;

type EditorBridge = {
  getHTML: () => Promise<string>;
  setContent: (content: string) => void;
  setImage: (src: string) => void;
  focus: () => void;
};

const PdfCreatorScreen = () => {
  const navigation = useNavigation<PdfCreatorNavigationProp>();
  const {
    document,
    currentPage,
    setCurrentPage,
    updateTitle,
    updateContent,
    addPage,
  } = usePdfCreator();
  const { addPdf } = usePdf();
  const [isExporting, setIsExporting] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const editorRef = useRef<EditorBridge | null>(null);

  const handleAddImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });

    if (result.assets && result.assets.length > 0) {
      for (const asset of result.assets) {
        if (asset.uri && editorRef.current) {
          try {
            const resizedImage = await ImageResizer.createResizedImage(
              asset.uri,
              500,
              500,
              'JPEG',
              90,
              0,
              undefined,
            );

            const base64 = await ReactNativeBlobUtil.fs.readFile(resizedImage.uri, 'base64');
            const dataUri = `data:image/jpeg;base64,${base64}`;

            editorRef.current.setImage(dataUri);
          } catch (error) {
            console.log('Image resize error:', error);
          }
        }
      }
    }
  };

  const handleSwitchPage = useCallback(async (newPage: number) => {
    if (editorRef.current) {
      const html = await editorRef.current.getHTML();
      updateContent(html, currentPage);
    }
    setCurrentPage(newPage);
  }, [currentPage, updateContent, setCurrentPage]);

  const handleAddPage = useCallback(async () => {
    if (editorRef.current) {
      const html = await editorRef.current.getHTML();
      if (html && html.trim() !== '' && html !== '<p></p>' && html !== '<p><br></p>') {
        updateContent(html, currentPage);
        addPage();
      } else {
        showToast({
          type: 'error',
          title: 'Empty Page',
          message: 'Write something on current page first',
        });
      }
    }
  }, [currentPage, updateContent, addPage]);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const currentHtml = editorRef.current ? await editorRef.current.getHTML() : '';

      const updatedPages = document.pages.map((page, index) => {
        if (index === currentPage) {
          return { ...page, content: currentHtml || page.content };
        }
        return page;
      });

      const allContent = updatedPages
        .map(page => page.content)
        .filter(content => content && content.trim() !== '' && content !== '<p></p>' && content !== '<p><br></p>')
        .join('<div style="page-break-after: always;"></div>');

      const styledHtml = `
        <html>
          <head>
            <style>
              @page {
                size: A4;
                margin: 15mm;
              }
              body {
                font-family: Arial, sans-serif;
                color: #333;
                font-size: 16pt;
                line-height: 1.8;
              }
              img {
                max-width: 400px !important;
                width: 400px !important;
                height: auto !important;
                display: block;
                margin: 16px 0 !important;
                border-radius: 8px;
              }
              p {
                margin: 12px 0 !important;
                line-height: 1.8 !important;
              }
              h1 {
                font-size: 28pt !important;
              }
              h2 {
                font-size: 24pt !important;
              }
              h3 {
                font-size: 20pt !important;
              }
            </style>
          </head>
          <body>
            ${allContent}
          </body>
        </html>
      `;

      const filePath = await generatePdfFromHtml(styledHtml, document.title);

      addPdf({
        id: `pdf-${Date.now()}`,
        name: `${document.title}.pdf`,
        uri: filePath,
        createdAt: new Date().toLocaleDateString(),
      });

      showToast({
        type: 'success',
        title: 'PDF Created',
        message: 'Your PDF has been saved to Downloads',
        onView: () => {
          navigation.navigate('PdfViewer', { uri: filePath });
        },
      });
    } catch (error) {
      console.log('Export error:', error);
      showToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not create PDF',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowRenameModal(true)}>
          <Ionicons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <ExportButton isExporting={isExporting} onPress={handleExport} />
      </View>

      <PageTabs
        pages={document.pages}
        currentPage={currentPage}
        onSelectPage={handleSwitchPage}
        onAddPage={handleAddPage}
      />

      <WebEditor
        key={document.pages[currentPage].id}
        content={document.pages[currentPage].content}
        editorRef={editorRef}
        onAddImage={handleAddImage}
      />

      <RenameModal
        visible={showRenameModal}
        currentTitle={document.title}
        onRename={updateTitle}
        onClose={() => setShowRenameModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
});

export default PdfCreatorScreen;