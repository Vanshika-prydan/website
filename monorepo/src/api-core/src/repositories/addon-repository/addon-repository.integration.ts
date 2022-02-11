import { setupDatabase } from '../../database/seeds';
import { openConnection, closeConnection } from '../../database/test-setup';
import { CreateAddonRequestPayload } from '../../domain/interface-adapters/repositories/addon-repository/create-addon-request-payload';
import { AddonRepository } from './addon-repository';

describe('Addon repository', () => {
  let repo: AddonRepository;
  const successfullPayload: CreateAddonRequestPayload = {
    name: 'Deep cleaning bathroom',
    description: 'This is an addon',
    unit: 'min',
    defaultTimeInMinutes: 120,
  };
  const expectedResult = {
    addonId: expect.any(String),
    name: 'Deep cleaning bathroom',
    description: 'This is an addon',
    unit: 'min',
    defaultTimeInMinutes: 120,
  };
  beforeEach(async () => {
    await openConnection();
    await setupDatabase();
    repo = new AddonRepository();
  });
  afterEach(async () => {
    await closeConnection();
  });
  describe('Create addon', () => {
    it('should successfully create a new record in the database', async () => {
      const response = await repo.create(successfullPayload);
      expect(response).toEqual(expect.objectContaining(expectedResult));
    });
  });
  describe('Get all', () => {
    it('should get a list with all', async () => {
      await repo.create(successfullPayload);
      const result = await repo.getAll();
      expect(result).toEqual(expect.arrayContaining([expectedResult]));
    });
  });
});
