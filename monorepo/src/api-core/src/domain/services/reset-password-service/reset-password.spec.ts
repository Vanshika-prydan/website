import ResetPasswordService from '.';
import ResetPasswordCode from '../../entities/ResetPasswordCode';
import { ResetPasswordCodeRepositoryInterface } from '../../interface-adapters/repositories/reset-password-code-repository';
import MockResetPasswordCode from '../../entities/ResetPasswordCode/mock-reset-password-code';

describe('ResetPasswordService', () => {
  let repo:ResetPasswordCodeRepositoryInterface;
  let service: ResetPasswordService;
  const validEntity = new MockResetPasswordCode({ code: '00000000' });
  const invalidEntity = new MockResetPasswordCode({ createdAt: new Date('2020-01-01') });

  beforeEach(() => {
    // @ts-ignore
    repo = {
      findByAccountId: jest.fn(() => Promise.resolve([validEntity, invalidEntity])),
      insert: jest.fn(() => Promise.resolve()),
      remove: jest.fn(() => Promise.resolve()),
    };
    service = new ResetPasswordService(repo);
  });

  describe('CodeIsValid', () => {
    it('should return true for a valid code', async () => {
      await expect(service.codeIsValid(validEntity.code, validEntity.accountId)).resolves.toBeTruthy();
      expect(repo.findByAccountId).toHaveBeenCalled();
    });
  });
  describe('generateNewResetPasswordEntity', () => {
    it('should generate a new entity', async () => {
      const entity = await service.generateNewResetPasswordEntity('5f0beb46-3b33-461b-993e-e3f97e7eeca4');
      // console.log(entity);
      expect(entity).toEqual(expect.any(ResetPasswordCode));
    });
  });
});
