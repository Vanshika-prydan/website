import { NextFunction, Request, Response } from 'express';
import { GetAllRolesUseCase } from '../../../../../domain/interactors/acccount/get-all-roles/get-all-roles';
import { RoleDTO } from '../../../../models/role.model';

interface ISetup {
    getAllRolesUseCase: GetAllRolesUseCase;
}

export const buildGetAllRolesController = ({ getAllRolesUseCase }:ISetup) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const allRoles = await getAllRolesUseCase.execute({ idOfExecutingAccount: req.accountId });
    const allRolesResponse = allRoles.map(r => new RoleDTO(r));
    return res.status(200).json(allRolesResponse);
  } catch (e) {
    next(e);
  }
};
