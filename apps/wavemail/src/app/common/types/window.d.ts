// Replace variables on response by Caddy
interface Window {
  Env: {
    NX_BACKEND_URL: string;
    NX_GOOGLE_OAUTH_CLIENT: string;
  };
}
