import { SendGridConfig, SendGridProvider } from './send-grid';

export const providers = {
  SEND_GRID: new SendGridProvider(SendGridConfig),
} as const;
