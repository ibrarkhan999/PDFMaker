import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import PdfCreatorScreen from '../features/pdfCreator/screens/PdfCreatorScreen';
import TextToPdfScreen from '../features/textToPdf/screens/TextToPdfScreen';
import ImagesToPdfScreen from '../features/imagesToPdf/screens/ImagesToPdfScreen';
import RecentPdfsScreen from '../features/recentPdfs/screens/RecentPdfsScreen';
import PdfViewerScreen from '../features/pdfViewer/screens/PdfViewerScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';
import { RootStackParamList } from './types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PdfCreator"
        component={PdfCreatorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TextToPdf"
        component={TextToPdfScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImagesToPdf"
        component={ImagesToPdfScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecentPdfs"
        component={RecentPdfsScreen}
        options={{ title: 'Recent PDFs' }}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
        options={{ title: 'PDF Viewer' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;