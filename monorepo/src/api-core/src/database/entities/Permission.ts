import { Entity, PrimaryColumn } from 'typeorm';
import PermissionEnum from '../../domain/entities/Permission';

@Entity()
export class Permission {
    @PrimaryColumn({ type: 'text' })
    permission!: PermissionEnum;

    constructor (permission?: PermissionEnum) {
      if (permission)
        this.permission = permission;
    }
}
