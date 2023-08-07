import { SendGridConfig, SendGridProvider } from './send-grid';
import { SMTPConfig, SMTPProvider } from './smtp';

export { Provider } from './provider';

export const providers = {
  SEND_GRID: new SendGridProvider(SendGridConfig),
  SMTP: new SMTPProvider(SMTPConfig),
} as const;
