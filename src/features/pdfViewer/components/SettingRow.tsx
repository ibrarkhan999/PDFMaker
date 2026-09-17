import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type SettingRowProps = {
  label: string;
  enabled: boolean;
  onToggle: () => void;
};

const SettingRow = ({ label, enabled, onToggle }: SettingRowProps) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onToggle}>
      <Text style={styles.label}>{label}</Text>
      <Ionicons
        name={enabled ? 'toggle' : 'close-circle-outline'}
        size={28}
        color={enabled ? colors.primary : colors.textMuted}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 15,
    color: colors.textPrimary,
  },
});

export default SettingRow;