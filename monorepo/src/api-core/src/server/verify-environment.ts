export const verifyEnvironmentOrFail = () => {
  if (!process.env.DOMAIN) throw new Error('CANNOT LOAD ENVIRONMENT DOMAIN)');
  if (!process.env.NODE_ENV) throw new Error('CANNOT LOAD ENVIRONMENT (NODE_ENV)');
  if (!process.env.MODE) throw new Error('CANNOT LOAD ENVIRONMENT (MODE)');
  if (!process.env.PORT) throw new Error('CANNOT LOAD ENVIRONMENT (PORT)');
  if (!process.env.DATABASE_NAME) throw new Error('CANNOT LOAD ENVIRONMENT (DATABASE_NAME)');
  if (!process.env.DATABASE_USER) throw new Error('CANNOT LOAD ENVIRONMENT (DATABASE_USER)');
  if (!process.env.DATABASE_PASSWORD) throw new Error('CANNOT LOAD ENVIRONMENT (DATABASE_PASSWORD)');
  if (!process.env.DATABASE_HOST) throw new Error('CANNOT LOAD ENVIRONMENT (DATABASE_HOST)');
  if (!process.env.DATABASE_PORT) throw new Error('CANNOT LOAD ENVIRONMENT (DATABASE_PORT)');
  if (!process.env.JWT_SECRET) throw new Error('CANNOT LOAD ENVIRONMENT (JWT_SECRET)');
  if (!process.env.TYPEORM_MODE) throw new Error('CANNOT LOAD ENVIRONMENT (TYPEORM_MODE)');
  if (!process.env.START_USER_USERNAME) throw new Error('CANNOT LOAD ENVIRONMENT (START_USER_USERNAME)');
  if (!process.env.START_USER_PASSWORD) throw new Error('CANNOT LOAD ENVIRONMENT (START_USER_PASSWORD)');
  if (!process.env.AWS_ACCESS_KEY_ID) throw new Error('CANNOT LOAD ENVIRONMENT (AWS_ACCESS_KEY_ID)');
  if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error('CANNOT LOAD ENVIRONMENT (AWS_SECRET_ACCESS_KEY)');
  if (!process.env.EXPO_ACCESS_TOKEN) throw new Error('CANNOT LOAD ENVIRONMENT (EXPO_ACCESS_TOKEN)');
  if (!process.env.EMAIL_ADDRESS_FOR_RECEIPT) throw new Error('CANNOT LOAD ENVIRONMENT (EMAIL_ADDRESS_FOR_RECEIPT)');
};
