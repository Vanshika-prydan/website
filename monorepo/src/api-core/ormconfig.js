module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: 5432,
  username: process.env.DATABASE_USER || 'dev',
  password: process.env.DATABASE_PASSWORD || 'dev',
  database: process.env.DATABASE_NAME || 'wecleangreen',
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  entities: [
    process.env.TYPEORM_MODE === 'build' ? 'dist/src/database/entities/**/*.js' : 'src/database/entities/**/*.ts',
    process.env.TYPEORM_MODE === 'build' ? 'dist/src/domain/entities/**/*.db.js' : 'src/domain/entities/**/*.db.ts',
  ],
  migrations: [
    process.env.TYPEORM_MODE === 'build' ? 'dist/src/database/migrations/**/*.js' : 'src/database/migrations/**/*.ts',
  ],
  subscribers: [
    process.env.TYPEORM_MODE === 'build' ? 'dist/src/database/subscribes/**/*.js' : 'src/database/subscribes/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};
