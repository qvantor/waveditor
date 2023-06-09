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
