import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type RenameModalProps = {
  visible: boolean;
  currentTitle: string;
  onRename: (newTitle: string) => void;
  onClose: () => void;
};

const RenameModal = ({ visible, currentTitle, onRename, onClose }: RenameModalProps) => {
  const [tempTitle, setTempTitle] = useState(currentTitle);

  const handleSave = () => {
    onRename(tempTitle);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
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
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.renameButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default RenameModal;