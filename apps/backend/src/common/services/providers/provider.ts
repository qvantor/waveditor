import { TypeC, Props, Context } from 'io-ts';
import { pipe } from 'fp-ts/function';
import { Reporter } from 'io-ts/Reporter';
import { fold } from 'fp-ts/Either';

function stringify(v: unknown): string {
  if (typeof v === 'number' && !isFinite(v)) {
    if (isNaN(v)) {
      return 'NaN';
    }
    return v > 0 ? 'Infinity' : '-Infinity';
  }
  return JSON.stringify(v);
}

const geyKey = (context: Context) =>
  context.find((entry) => entry.key !== '') || null;

const formatReport: Reporter<Array<[key: string, error: string]>>['report'] =
  fold(
    (errors) =>
      errors.reduce<Array<[string, string]>>((sum, error) => {
        const entry = geyKey(error.context);
        if (!entry) return sum;
        return [
          ...sum,
          [
            entry.key,
            error.message ??
              `Invalid value ${stringify(error.value)}, should be ${
                entry.type.name
              }`,
          ],
        ];
      }, []),
    () => []
  );

export type EmailSendConfig = {
  from?: string;
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

  toJSON(data: T): string {
    return JSON.stringify(data);
  }

  abstract sendEmail(
    sendConfig: EmailSendConfig,
    providerConfig: T
  ): Promise<boolean>;
}
