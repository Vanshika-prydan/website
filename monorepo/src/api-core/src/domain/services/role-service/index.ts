import { injectable } from 'tsyringe';
import validator from 'validator';

export const INVALID_ROLE_NAME = 'INVALID_ROLE_NAME';
export const INVALID_ROLE_DESCRIPTION = 'INVALID_ROLE_DESCRIPTION';

@injectable()
export default class RoleService {
  public static validateAndFormatName (name:string):string {
    const formattedName = name.trim();
    if (!validator.isLength(formattedName, { max: 40 })) throw new Error(INVALID_ROLE_NAME);
    return formattedName;
  }

  public static validateAndFormatDescription (text:string):string {
    const formattedText = text.trim();
    if (!validator.isLength(formattedText, { max: 400 })) throw new Error(INVALID_ROLE_DESCRIPTION);
    return formattedText;
  }
}
