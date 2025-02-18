export const appConfig = {
  name: 'app',
  version: '1.0.0',
  description: 'app description',
  refreshCookieName: 'refresh_token',
  refreshCookieMaxAgeMilliSeconds: 1000 * 60 * 60 * 24 * 30, // 30 days
  accessTokenMaxAgeMilliSeconds: 1000 * 60 * 15, // 15 minutes
};
