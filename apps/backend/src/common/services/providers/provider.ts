import { TypeC, Props } from 'io-ts';
import { pipe } from 'fp-ts/function';
import { formatReport } from '../error-handling';

export type EmailSendConfig = {
  from?: string;
  fromName?: string;
  to: string[];
  subject: string;
  content: string;
};

export abstract class Provider<T> {
  constructor(private config: TypeC<Props>) {}

  validate(json: unknown): Array<[key: string, error: string]> {
    return pipe(this.config.decode(json), formatReport);
  }

  check(json: unknown): json is T {
    return this.validate(json).length === 0;
  }

  toString(data: T): string {
    return JSON.stringify(data);
  }

  abstract sendEmail(
    sendConfig: EmailSendConfig,
    providerConfig: T
  ): Promise<boolean>;
}
