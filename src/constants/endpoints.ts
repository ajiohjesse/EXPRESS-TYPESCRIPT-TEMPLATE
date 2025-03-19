export const END_PONITS = {
  HEALTH_CHECK: '/health-check',

  SSE: {
    BASE: '/sse',
  },

  DOCS: {
    UI: '/docs',
    JSON: '/docs.json',
  },

  LOGS: '/logs',

  POSTS: {
    BASE: '/v1/posts',
  },

  AUTH: {
    BASE: '/v1/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    REFRESH_TOKEN: '/refresh-token',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
  },
} as const;
