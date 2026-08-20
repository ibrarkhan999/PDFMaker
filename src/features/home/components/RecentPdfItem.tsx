import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PdfItem } from '../../../context/PdfContext';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type RecentPdfItemProps = {
  pdf: PdfItem;
  onPress: () => void;
  onRename?: (id: string, newName: string) => void;
  onDelete?: (id: string) => void;
};

const RecentPdfItem = ({ pdf, onPress, onRename, onDelete }: RecentPdfItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [newName, setNewName] = useState(pdf.name.replace(/\.pdf$/i, ''));

  const handleRename = () => {
    if (onRename && newName.trim()) {
      const cleanName = newName.trim().replace(/\.pdf$/i, '');
      onRename(pdf.id, `${cleanName}.pdf`);
    }
    setShowRename(false);
    setShowMenu(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={22} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {pdf.name}
        </Text>
        <Text style={styles.date}>{pdf.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
      </TouchableOpacity>

      <Modal visible={showMenu} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowMenu(false)}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                setShowRename(true);
              }}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.menuText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (onDelete) {
                  onDelete(pdf.id);
                }
                setShowMenu(false);
              }}
            >
              <Ionicons name="trash-outline" size={18} color={colors.error} />
              <Text style={[styles.menuText, { color: colors.error }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showRename} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.renameModal}>
            <Text style={styles.renameTitle}>Rename PDF</Text>
            <TextInput
              style={styles.renameInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter document name"
            />
            <View style={styles.renameButtons}>
              <TouchableOpacity
                style={[styles.renameButton, styles.cancelButton]}
                onPress={() => setShowRename(false)}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  moreButton: {
    padding: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.sm,
    minWidth: 180,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  menuText: {
    fontSize: 15,
    color: colors.textPrimary,
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

export default RecentPdfItem;