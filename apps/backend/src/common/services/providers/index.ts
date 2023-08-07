import { ProviderType } from '../../types/gql.g';
import { SendGridConfig, SendGridProvider } from './send-grid';
import { SMTPConfig, SMTPProvider } from './smtp';

import { Provider } from './provider';

export { Provider };
export const providers: Record<ProviderType, Provider<unknown>> = {
  SEND_GRID: new SendGridProvider(SendGridConfig),
  SMTP: new SMTPProvider(SMTPConfig),
};
