import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { useImagesToPdf } from '../hooks/useImagesToPdf';
import { generatePdfFromHtml } from '../../../utils/pdfUtils';
import { usePdf } from '../../../context/PdfContext';
import { showToast } from '../../../components/Toast';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import ImageResizer from 'react-native-image-resizer';


type ImagesToPdfNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ImagesToPdf'>;

const ImagesToPdfScreen = () => {
  const navigation = useNavigation<ImagesToPdfNavigationProp>();
  const { images, documentTitle, addImages, removeImage, moveImage, rotateImage, updateTitle } = useImagesToPdf();
  const { addPdf } = usePdf();
  const [isExporting, setIsExporting] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);

  const handlePickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });

    if (result.assets && result.assets.length > 0) {
      const uris = result.assets
        .filter(asset => asset.uri)
        .map(asset => asset.uri as string);
      addImages(uris);
    }
  };

const handleExport = async () => {
  if (images.length === 0) {
    showToast({
      type: 'error',
      title: 'No Images',
      message: 'Please add at least one image',
    });
    return;
  }

  try {
    setIsExporting(true);

    // Process images with rotation
    const processedImages = [];
    for (const img of images) {
      if (img.rotation && img.rotation > 0) {
        const resized = await ImageResizer.createResizedImage(
          img.uri,
          1200,
          1200,
          'JPEG',
          90,
          img.rotation,
          undefined,
        );
        processedImages.push({ ...img, uri: resized.uri });
      } else {
        processedImages.push(img);
      }
    }

    const imageHtml = processedImages
      .map(
        (img) => `
          <div style="page-break-after: always; page-break-inside: avoid; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="${img.uri}" style="max-width: 95%; max-height: 95%; object-fit: contain;" />
          </div>
        `,
      )
      .join('');

    const html = `
      <html>
        <head>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
            }
            img {
              width: auto;
              height: auto;
            }
          </style>
        </head>
        <body>
          ${imageHtml}
        </body>
      </html>
    `;

    const filePath = await generatePdfFromHtml(html, documentTitle);

    addPdf({
      id: `pdf-${Date.now()}`,
      name: `${documentTitle}.pdf`,
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

      {images.length === 0 ? (
        <TouchableOpacity style={styles.emptyContainer} onPress={handlePickImages}>
          <Ionicons name="images-outline" size={64} color={colors.textMuted} />
          <Text style={styles.emptyText}>Tap to add images</Text>
          <Text style={styles.emptySubtext}>Each image becomes a page</Text>
        </TouchableOpacity>
      ) : (
        <ScrollView style={styles.imageList} showsVerticalScrollIndicator={false}>
          {images.map((img, index) => (
            <View key={img.id} style={styles.imageCard}>
              <Image
                source={{ uri: img.uri }}
                style={[
                  styles.image,
                  img.rotation && { transform: [{ rotate: `${img.rotation}deg` }] },
                ]}
              />
              <View style={styles.imageControls}>
                <View style={styles.imageInfo}>
                  <Text style={styles.pageNumber}>Page {index + 1}</Text>
                </View>
                <View style={styles.controlButtons}>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => moveImage(index, 'up')}
                    disabled={index === 0}
                  >
                    <Ionicons name="arrow-up" size={18} color={index === 0 ? colors.textMuted : colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => moveImage(index, 'down')}
                    disabled={index === images.length - 1}
                  >
                    <Ionicons name="arrow-down" size={18} color={index === images.length - 1 ? colors.textMuted : colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => rotateImage(img.id)}
                  >
                    <Ionicons name="refresh-outline" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => removeImage(img.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addMoreButton} onPress={handlePickImages}>
            <Ionicons name="add" size={20} color={colors.primary} />
            <Text style={styles.addMoreText}>Add More Images</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    marginVertical: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
  },
  imageList: {
    flex: 1,
  },
  imageCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    resizeMode: 'contain',
    backgroundColor: '#F0F0F0',
  },
  imageControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  imageInfo: {
    flex: 1,
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  controlButton: {
    padding: spacing.sm,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    borderStyle: 'dashed',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  addMoreText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '500',
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

export default ImagesToPdfScreen;