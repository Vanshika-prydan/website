import { AWSSNS } from '.';

describe('Should create a new notification', () => {
  it('should ', async () => {
    process.env.NODE_ENV = 'local';
    await new AWSSNS().send('Test', 'ERROR');
  });
});
