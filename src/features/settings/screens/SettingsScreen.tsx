import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSettings } from '../../../context/SettingsContext';
import { usePdf } from '../../../context/PdfContext';
import { showToast } from '../../../components/Toast';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28];

const SettingsScreen = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { clearAll } = usePdf();
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState(settings.defaultPdfName);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showPageSizeModal, setShowPageSizeModal] = useState(false);

  const handleSaveName = () => {
    updateSettings({ defaultPdfName: tempName });
    setShowNameModal(false);
    showToast({ type: 'success', title: 'Saved', message: 'Default PDF name updated' });
  };

  const handleClearAll = () => {
    clearAll();
    showToast({ type: 'success', title: 'Cleared', message: 'All recent PDFs cleared' });
  };

  const handleReset = () => {
    resetSettings();
    showToast({ type: 'success', title: 'Reset', message: 'Settings reset to default' });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.settingRow} onPress={() => setShowNameModal(true)}>
        <View style={styles.settingIcon}>
          <Ionicons name="document-text-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Default PDF Name</Text>
          <Text style={styles.settingValue}>{settings.defaultPdfName}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow} onPress={() => setShowSizeModal(true)}>
        <View style={styles.settingIcon}>
          <Ionicons name="text-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Default Font Size</Text>
          <Text style={styles.settingValue}>{settings.defaultFontSize}pt</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow} onPress={() => setShowPageSizeModal(true)}>
        <View style={styles.settingIcon}>
          <Ionicons name="document-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Default Page Size</Text>
          <Text style={styles.settingValue}>{settings.defaultPageSize}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingRow}
        onPress={() =>
          updateSettings({
            defaultOrientation:
              settings.defaultOrientation === 'portrait' ? 'landscape' : 'portrait',
          })
        }
      >
        <View style={styles.settingIcon}>
          <Ionicons name="phone-portrait-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Default Orientation</Text>
          <Text style={styles.settingValue}>
            {settings.defaultOrientation === 'portrait' ? 'Portrait' : 'Landscape'}
          </Text>
        </View>
        <Ionicons name="swap-horizontal" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.settingRow} onPress={handleClearAll}>
        <View style={[styles.settingIcon, { backgroundColor: colors.errorLight }]}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.error }]}>
            Clear All Recent PDFs
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow} onPress={handleReset}>
        <View style={[styles.settingIcon, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="refresh-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Reset Settings</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>PDFMaker</Text>
        <Text style={styles.aboutVersion}>Version 1.0.0</Text>
      </View>

      <Modal visible={showNameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Default PDF Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter default name"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowNameModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveName}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showSizeModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowSizeModal(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Default Font Size</Text>
            {fontSizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  settings.defaultFontSize === size && styles.sizeOptionSelected,
                ]}
                onPress={() => {
                  updateSettings({ defaultFontSize: size });
                  setShowSizeModal(false);
                }}
              >
                <Text style={styles.sizeOptionText}>{size}pt</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showPageSizeModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowPageSizeModal(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Default Page Size</Text>
            {['A4', 'Letter'].map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  settings.defaultPageSize === size && styles.sizeOptionSelected,
                ]}
                onPress={() => {
                  updateSettings({ defaultPageSize: size as 'A4' | 'Letter' });
                  setShowPageSizeModal(false);
                }}
              >
                <Text style={styles.sizeOptionText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  settingValue: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  aboutContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    gap: spacing.xs,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  aboutVersion: {
    fontSize: 13,
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.xl,
    width: '80%',
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 15,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  modalButton: {
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
  sizeOption: {
    padding: spacing.md,
    borderRadius: 8,
  },
  sizeOptionSelected: {
    backgroundColor: colors.primaryLight,
  },
  sizeOptionText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
});

export default SettingsScreen;