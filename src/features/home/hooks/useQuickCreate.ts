import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useQuickCreate = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleTextToPdf = () => {
    navigation.navigate('TextToPdf');
  };

  const handleImagesToPdf = () => {
    navigation.navigate('ImagesToPdf');
  };

  return {
    handleTextToPdf,
    handleImagesToPdf,
  };
};