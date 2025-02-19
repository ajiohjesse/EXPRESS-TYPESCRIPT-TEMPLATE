export const API_ROUTES = {
  HEALTH_CHECK: '/health-check',
  LOGS: {
    GET_LOGS: '/logs',
    GET_LOG_FILE: '/logs/:filename',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    REFRESH_TOKEN: '/refresh-token',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
  },
} as const;
