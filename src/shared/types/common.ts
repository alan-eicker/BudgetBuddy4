export interface ErrorMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
