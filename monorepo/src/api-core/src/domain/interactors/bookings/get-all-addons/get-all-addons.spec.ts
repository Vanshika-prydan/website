import { IAddonRepository } from '../../../interface-adapters/repositories/addon-repository';
import { GetAllAddonsUseCase } from './get-all-addons';

describe('GetAllAddonsUseCase', () => {
  it('should get a list from the repo', async () => {
    const expectedValue = {};
    const addonRepository = { getAll: jest.fn(() => Promise.resolve(expectedValue)) } as unknown as IAddonRepository;
    const usecase = new GetAllAddonsUseCase({ addonRepository });

    await expect(usecase.execute()).resolves.toBe(expectedValue);
  });
});
