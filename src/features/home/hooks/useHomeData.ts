import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeData = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCreatePdf = () => {
    navigation.navigate('PdfCreator');
  };

  return {
    handleCreatePdf,
  };
};