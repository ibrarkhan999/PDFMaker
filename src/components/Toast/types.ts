export type ToastType = 'success' | 'error' | 'info';

export type ToastState = {
  visible: boolean;
  type: ToastType;
  title: string;
  message?: string;
};