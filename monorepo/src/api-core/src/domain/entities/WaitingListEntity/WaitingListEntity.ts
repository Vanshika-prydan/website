import { Optional } from '../../../types/optional';
import {
  IsNumberString,
  Length,
  IsEmail,
  IsUUID,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { WaitingListEntityInterface } from '.';

export default class WaitingListEntity implements WaitingListEntityInterface {
  @IsUUID('4')
  readonly waitingListEntityId: string;

  @IsEmail()
  readonly email: string;

  @IsNumberString()
  @Length(5, 5)
  readonly postalCode: string;

  constructor (payload: Optional<WaitingListEntityInterface, 'waitingListEntityId'>) {
    this.waitingListEntityId = payload.waitingListEntityId ?? uuid();
    this.email = payload.email.trim().toLowerCase();
    this.postalCode = payload.postalCode.trim();
    return this;
  }
}
