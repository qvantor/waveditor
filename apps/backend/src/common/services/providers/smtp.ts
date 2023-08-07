import { string, number, type, TypeOf } from 'io-ts';
import nodemailer from 'nodemailer';
import { logger } from '../../../app';
import { to } from "../error-handling";
import { Provider, EmailSendConfig } from './provider';

export const SMTPConfig = type({
  host: string,
  port: number,
  user: string,
  password: string,
  defaultFrom: string,
  defaultName: string,
});

export type SMTPConfigT = TypeOf<typeof SMTPConfig>;

export class SMTPProvider extends Provider<SMTPConfigT> {
  async sendEmail(sendConfig: EmailSendConfig, providerConfig: SMTPConfigT) {
    // @todo optimise(memoization) transport creation
    const smtpTransport = nodemailer.createTransport({
      host: providerConfig.host,
      port: providerConfig.port,
      auth: {
        user: providerConfig.user,
        pass: providerConfig.password,
      },
    });
    const [result, err] = await to(smtpTransport.sendMail({
      from: `${sendConfig.fromName || providerConfig.defaultName} <${
        sendConfig.from || providerConfig.defaultFrom
      }>`,
      to: sendConfig.to.join(','),
      subject: sendConfig.subject,
      html: sendConfig.content,
    }));
    logger.debug(result);
    return !!err;
  }
}
