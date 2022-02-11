import { GetAllRolesUseCase } from '../../../../../domain/interactors/acccount/get-all-roles/get-all-roles';
import { buildGetAllRolesController } from './get-all-roles-controller';
import { Request, Response } from 'express';

import { mockRole } from '../../../../../../mock/role';
import ControllerTest from '../../../../../utilities/controller-test';

describe('Get all roles controller', () => {
  it('should return 200', async () => {
    const role = { ...mockRole };
    const req = { accountId: 'uuid' } as unknown as Request;
    const res = { status: jest.fn(() => res), json: jest.fn() } as unknown as Response;
    const getAllRolesUseCase = { execute: jest.fn(() => Promise.resolve([role])) } as unknown as GetAllRolesUseCase;
    const controller = buildGetAllRolesController({ getAllRolesUseCase });
    const utils = new ControllerTest();

    await controller(req, res, utils.next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
      name: role.name,
      permissions: role.permissions,
      description: role.description,
    }]);
    expect(getAllRolesUseCase.execute).toHaveBeenCalledWith({ idOfExecutingAccount: 'uuid' });
  });

  it('should call next on error', async () => {
    const req = {} as unknown as Request;
    const e = new Error();
    const res = { status: jest.fn(() => res), json: jest.fn() } as unknown as Response;
    const getAllRolesUseCase = { execute: jest.fn(() => Promise.reject(e)) } as unknown as GetAllRolesUseCase;
    const controller = buildGetAllRolesController({ getAllRolesUseCase });
    const utils = new ControllerTest();

    await controller(req, res, utils.next);
    expect(utils.next).toHaveBeenCalledWith(expect.any(Error));
  });
});
