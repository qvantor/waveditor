import * as process from 'process';

const checkConst = (name: string) => {
  const value = process.env[name];
  if (value !== undefined) return value;
  else
    throw new Error(
      `Environment variable ${name} in not specified, but required`
    );
};

export const GOOGLE_OAUTH_CLIENT = checkConst('NX_GOOGLE_OAUTH_CLIENT');
export const JWT_SECRET = checkConst('JWT_SECRET');
export const LOG_LEVEL = checkConst('LOG_LEVEL');
export const NODE_ENV = checkConst('NODE_ENV');
export const IS_DEV = NODE_ENV === 'dev' || NODE_ENV === 'development';
export const ADMIN_EMAILS = process.env.ADMIN_EMAILS ?? '';
export const DEMO_MATERIALS = Number(process.env.DEMO_MATERIALS) === 1;
