import { type, string, TypeOf } from 'io-ts';

import axios from 'axios';
import { to } from '../error-handling';
import { Provider, EmailSendConfig } from './provider';

export const SendGridConfig = type({
  url: string,
  key: string,
  defaultFrom: string,
  defaultName: string,
});

type SendGridConfigT = TypeOf<typeof SendGridConfig>;

export class SendGridProvider extends Provider<SendGridConfigT> {
  async sendEmail(
    sendConfig: EmailSendConfig,
    providerConfig: SendGridConfigT
  ) {
    const [, err] = await to(
      axios.post(
        providerConfig.url,
        {
          personalizations: sendConfig.to.map((email) => ({
            to: [
              {
                email,
              },
            ],
          })),
          from: {
            name: sendConfig.fromName ?? providerConfig.defaultName,
            email: sendConfig.from ?? providerConfig.defaultFrom,
          },
          subject: sendConfig.subject,
          content: [{ type: 'text/html', value: sendConfig.content }],
        },
        {
          headers: { Authorization: `Bearer ${providerConfig.key}` },
        }
      )
    );

    return err === null;
  }
}
