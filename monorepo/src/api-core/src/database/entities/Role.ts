import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, RelationId } from 'typeorm';
import PermissionEnum from '../../domain/entities/Permission';
import { IRole } from '../../domain/entities/Role';
import { Permission } from './Permission';
@Entity()
export class Role implements IRole {
    @PrimaryColumn({ name: 'name', length: 40 })
    name!: string;

    @Column({ name: 'description', length: 1000 })
    description!: string;

   @ManyToMany(() => Permission, p => p.permission, { eager: true, cascade: true })
   @JoinTable({
     name: 'role_permissions',
     joinColumn: {
       name: 'role',
     },
     inverseJoinColumn: {
       name: 'permission',
     },
   })
    permissionRelations!: Permission[];

    @RelationId((r:Role) => r.permissionRelations)
    permissions!: PermissionEnum[];

    constructor (values?: IRole) {
      if (values) {
        this.name = values.name;
        this.description = values.description;
        this.permissions = values.permissions ?? [];
      }
    }
}
