import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CreatePdfCard from '../components/CreatePdfCard';
import QuickCreateCard from '../components/QuickCreateCard';
import RecentPdfItem from '../components/RecentPdfItem';
import { useHomeData } from '../hooks/useHomeData';
import { useRecentPdfs } from '../hooks/useRecentPdfs';
import { useQuickCreate } from '../hooks/useQuickCreate';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { handleCreatePdf } = useHomeData();
  const { recentPdfs, removePdf, renamePdf } = useRecentPdfs();
  const { handleTextToPdf, handleImagesToPdf } = useQuickCreate();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PDFMaker</Text>
<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
  <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
</TouchableOpacity>
      </View>

      <CreatePdfCard onPress={handleCreatePdf} />

      <Text style={styles.sectionTitle}>Quick Create</Text>
      <View style={styles.quickCreateRow}>
        <QuickCreateCard
          icon="document-text-outline"
          title="Text to PDF"
          onPress={handleTextToPdf}
        />
        <QuickCreateCard
          icon="images-outline"
          title="Images to PDF"
          onPress={handleImagesToPdf}
        />
      </View>

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent PDFs</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RecentPdfs')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {recentPdfs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyText}>No PDFs yet</Text>
          <Text style={styles.emptySubtext}>Create your first PDF to get started</Text>
        </View>
      ) : (
        recentPdfs.map(pdf => (
          <RecentPdfItem
            key={pdf.id}
            pdf={pdf}
            onPress={() => navigation.navigate('PdfViewer', { uri: pdf.uri })}
            onRename={renamePdf}
            onDelete={removePdf}
          />
        ))
      )}
    </ScrollView>
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
    marginBottom: spacing.xl,
  },
  headerTitle: {
    ...typography.h1,
  },
  sectionTitle: {
    ...typography.h3,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  quickCreateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  emptySubtext: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default HomeScreen;