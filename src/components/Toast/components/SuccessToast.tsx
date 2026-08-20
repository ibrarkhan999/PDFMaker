import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type SuccessToastProps = {
  title: string;
  message?: string;
  onView?: () => void;
  onClose?: () => void;
};

const SuccessToast = ({ title, message, onView, onClose }: SuccessToastProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
      </View>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={onView}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.okButton]} onPress={onClose}>
          <Text style={styles.okButtonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minWidth: 280,
    maxWidth: 320,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#E8F5E9',
  },
  okButton: {
    backgroundColor: '#4CAF50',
  },
  viewButtonText: {
    color: '#4CAF50',
    fontSize: 15,
    fontWeight: '600',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SuccessToast;