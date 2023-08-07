import { type, string, TypeOf } from 'io-ts';

import axios from 'axios';
import { Provider, EmailSendConfig } from './provider';

export const SendGridConfig = type({
  url: string,
  key: string,
  defaultFrom: string,
});

type SendGridConfigT = TypeOf<typeof SendGridConfig>;

export class SendGridProvider extends Provider<SendGridConfigT> {
  async sendEmail(
    sendConfig: EmailSendConfig,
    providerConfig: SendGridConfigT
  ) {
    const { data } = await axios.post(
      providerConfig.url,
      {
        personalizations: sendConfig.to.map((email) => ({
          email,
        })),
        from: { email: sendConfig.from ?? providerConfig.defaultFrom },
        subject: sendConfig.subject,
        content: [{ type: 'text/html', value: sendConfig.content }],
      },
      {
        headers: { Authorization: `Bearer ${providerConfig.key}` },
      }
    );
    console.log(data);
    return false;
  }
}
