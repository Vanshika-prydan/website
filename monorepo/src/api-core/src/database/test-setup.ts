import { createConnection, getConnection } from 'typeorm';
import options from '../../ormconfig';

const config = {
  ...options,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'wecleangreen',
  synchronize: true,
  dropSchema: true,
  migrationsRun: true,
  logging: false,
};

// @ts-ignore
export const openConnection = () => createConnection(config);

export const closeConnection = () => getConnection().close();
