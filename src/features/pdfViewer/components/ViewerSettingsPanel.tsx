import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingRow from './SettingRow';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type ViewerSettingsPanelProps = {
  visible: boolean;
  onClose: () => void;
  showPageNumber: boolean;
  setShowPageNumber: (value: boolean) => void;
  enablePaging: boolean;
  setEnablePaging: (value: boolean) => void;
  horizontal: boolean;
  setHorizontal: (value: boolean) => void;
  spacing: number;
  setSpacing: (value: number) => void;
  fitPolicy: number;
  setFitPolicy: (value: number) => void;
};

const spacingValues = [0, 5, 10, 20, 30];

const ViewerSettingsPanel = ({
  visible,
  onClose,
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
}: ViewerSettingsPanelProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.settingsPanel}>
          <View style={styles.settingsHeader}>
            <Text style={styles.settingsTitle}>View Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <SettingRow
              label="Show Page Number"
              enabled={showPageNumber}
              onToggle={() => setShowPageNumber(!showPageNumber)}
            />

            <SettingRow
              label="Enable Paging"
              enabled={enablePaging}
              onToggle={() => setEnablePaging(!enablePaging)}
            />

            <SettingRow
              label="Horizontal Scroll"
              enabled={horizontal}
              onToggle={() => setHorizontal(!horizontal)}
            />

            <View style={styles.settingBlock}>
              <Text style={styles.settingLabel}>Page Spacing: {spacing}px</Text>
              <View style={styles.optionRow}>
                {spacingValues.map(value => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.optionButton,
                      spacing === value && styles.optionButtonActive,
                    ]}
                    onPress={() => setSpacing(value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        spacing === value && styles.optionTextActive,
                      ]}
                    >
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingBlock}>
              <Text style={styles.settingLabel}>Page Fit</Text>
              <View style={styles.optionRow}>
                {['Width', 'Height', 'Both'].map((label, index) => (
                  <TouchableOpacity
                    key={label}
                    style={[
                      styles.fitButton,
                      fitPolicy === index && styles.optionButtonActive,
                    ]}
                    onPress={() => setFitPolicy(index)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        fitPolicy === index && styles.optionTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  settingsPanel: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.xl,
    maxHeight: '70%',
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  settingBlock: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  optionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  optionButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surface,
    minWidth: 50,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  optionTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  fitButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
});

export default ViewerSettingsPanel;