import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type PageTabsProps = {
  pages: { id: string; content: string }[];
  currentPage: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
};

const PageTabs = ({ pages, currentPage, onSelectPage, onAddPage }: PageTabsProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {pages.map((page, index) => (
          <TouchableOpacity
            key={page.id}
            style={[
              styles.pageTab,
              currentPage === index && styles.pageTabActive,
            ]}
            onPress={() => onSelectPage(index)}
          >
            <Text
              style={[
                styles.pageTabText,
                currentPage === index && styles.pageTabTextActive,
              ]}
            >
              Page {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={onAddPage}>
        <Ionicons name="add" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  pageTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    backgroundColor: colors.surface,
    marginRight: spacing.xs,
  },
  pageTabActive: {
    backgroundColor: colors.primary,
  },
  pageTabText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  pageTabTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageTabs;