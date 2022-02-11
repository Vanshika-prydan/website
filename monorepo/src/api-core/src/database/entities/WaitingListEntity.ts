import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '../../types/optional';
import { v4 as uuid } from 'uuid';
import { WaitingListEntityInterface } from '../../domain/entities/WaitingListEntity';

@Entity({ name: 'waiting_list' })
export default class WaitingListEntity implements WaitingListEntityInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'waiting_list_entity_id' })
  public waitingListEntityId!: string;

  @Column()
  public email!: string;

  @Column()
  public postalCode!: string;

  constructor (payload?: Optional<WaitingListEntityInterface, 'waitingListEntityId'>) {
    if (payload) {
      this.waitingListEntityId = payload.waitingListEntityId ?? uuid();
      this.email = payload.email;
      this.postalCode = payload.postalCode;
    }
    return this;
  }
}
