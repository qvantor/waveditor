const Variables = ['NX_GOOGLE_OAUTH_CLIENT', 'NX_BACKEND_URL'] as const;

export const getEnvValue = (key: (typeof Variables)[number]) =>
  process.env[key] || window.Env[key];
