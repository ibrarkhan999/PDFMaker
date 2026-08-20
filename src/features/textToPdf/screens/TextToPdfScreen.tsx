import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTextToPdf } from '../hooks/useTextToPdf';
import { generatePdfFromHtml } from '../../../utils/pdfUtils';
import { usePdf } from '../../../context/PdfContext';
import { showToast } from '../../../components/Toast';
import { RootStackParamList } from '../../../navigation/types';
import WebEditor from '../components/WebEditor';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type TextToPdfNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TextToPdf'>;

type EditorBridge = {
  getHTML: () => Promise<string>;
  setContent: (content: string) => void;
  focus: () => void;
};

const TextToPdfScreen = () => {
  const navigation = useNavigation<TextToPdfNavigationProp>();
  const { document, updateTitle } = useTextToPdf();
  const { addPdf } = usePdf();
  const [isExporting, setIsExporting] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [tempTitle, setTempTitle] = useState(document.title);
  const editorRef = useRef<EditorBridge | null>(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const html = await editorRef.current?.getHTML();

      const styledHtml = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 40px;
                color: #333;
                font-size: 14pt;
                line-height: 1.6;
              }
              p {
                margin: 12px 0 !important;
                font-size: 14pt !important;
                line-height: 1.6 !important;
              }
              h1 {
                font-size: 24pt !important;
              }
              h2 {
                font-size: 20pt !important;
              }
              h3 {
                font-size: 18pt !important;
              }
            </style>
          </head>
          <body>
            ${html}
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
      showToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not create PDF',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleRename = () => {
    updateTitle(tempTitle);
    setShowRenameModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowRenameModal(true)}>
          <Ionicons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
          onPress={handleExport}
          disabled={isExporting}
        >
          <Text style={styles.exportText}>
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Text>
        </TouchableOpacity>
      </View>

      <WebEditor
        content={document.pages[0].content}
        editorRef={editorRef}
      />

      <Modal visible={showRenameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.renameModal}>
            <Text style={styles.renameTitle}>Rename Document</Text>
            <TextInput
              style={styles.renameInput}
              value={tempTitle}
              onChangeText={setTempTitle}
              placeholder="Document title"
            />
            <View style={styles.renameButtons}>
              <TouchableOpacity
                style={[styles.renameButton, styles.cancelButton]}
                onPress={() => setShowRenameModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.renameButton, styles.saveButton]}
                onPress={handleRename}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  exportButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  exportButtonDisabled: {
    opacity: 0.5,
  },
  exportText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renameModal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.xl,
    width: '80%',
  },
  renameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  renameInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 15,
    marginBottom: spacing.lg,
  },
  renameButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  renameButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: colors.surface,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  saveText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TextToPdfScreen;