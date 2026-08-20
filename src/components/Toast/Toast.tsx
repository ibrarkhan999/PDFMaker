import React, {useEffect, useRef, useState} from 'react';
import {Animated, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {ToastState} from './types';
import SuccessToast from './components/SuccessToast';
import ErrorToast from './components/ErrorToast';
import InfoToast from './components/InfoToast';

type ShowToastParams = {
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onView?: () => void;
};

let showToastRef: (params: ShowToastParams) => void;

const Toast = () => {
  const [toast, setToast] = useState<ToastState & {onView?: () => void}>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    showToastRef = params => {
      setToast({visible: true, ...params});
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  const hideToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setToast(prev => ({...prev, visible: false}));
    });
  };

  const handleView = () => {
    hideToast();
    if (toast.onView) {
      toast.onView();
    }
  };

  const renderToast = () => {
    switch (toast.type) {
      case 'success':
        return (
          <SuccessToast
            title={toast.title}
            message={toast.message}
            onView={handleView}
            onClose={hideToast}
          />
        );
      case 'error':
        return (
          <ErrorToast
            title={toast.title}
            message={toast.message}
            onCancel={hideToast}
          />
        );
      case 'info':
        return <InfoToast title={toast.title} message={toast.message} />;
    }
  };

  return (
    <Modal transparent visible={toast.visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={hideToast}>
        <Animated.View style={{opacity}}>{renderToast()}</Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const showToast = (params: ShowToastParams) => {
  if (showToastRef) {
    showToastRef(params);
  }
};

export default Toast;
