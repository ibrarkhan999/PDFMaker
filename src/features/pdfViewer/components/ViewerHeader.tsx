import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type ViewerHeaderProps = {
  currentPage: number;
  totalPages: number;
  showPageNumber: boolean;
  onBack: () => void;
  onOpenSettings: () => void;
};

const ViewerHeader = ({
  currentPage,
  totalPages,
  showPageNumber,
  onBack,
  onOpenSettings,
}: ViewerHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>PDF Viewer</Text>
        {showPageNumber && totalPages > 0 && (
          <Text style={styles.headerSubtitle}>
            Page {currentPage} of {totalPages}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={onOpenSettings} style={styles.headerButton}>
        <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    padding: spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});

export default ViewerHeader;