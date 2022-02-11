type Environment = 'development' | 'production' | 'staging';
declare module '@env' {
  export const NODE_ENV: Environment;
  export const ENVIRONMENT: Environment;
  export const STRIPE_PUBLISHABLE_KEY: string;
  export const API_URL: string;
  export const APPLE_MERCHANT_ID: string;
  export const SENTRY_AUTH_TOKEN: string;
  export const SENTRY_DSN: string;
}
