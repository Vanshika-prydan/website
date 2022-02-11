import 'reflect-metadata';

require('dotenv-flow').config();

require('./register');

console.log('Server is running in ', process.env.NODE_ENV, ' mode');

require('./server');
