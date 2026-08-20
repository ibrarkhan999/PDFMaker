import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type ExportButtonProps = {
  isExporting: boolean;
  onPress: () => void;
};

const ExportButton = ({ isExporting, onPress }: ExportButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isExporting && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isExporting}
    >
      <Text style={styles.text}>
        {isExporting ? 'Exporting...' : 'Export PDF'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ExportButton;