export interface Message {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
