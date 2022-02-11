import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { v4 } from 'uuid';
import { IAccount } from '../../domain/entities/Account';
import { Optional } from '../../types/optional';
import { Role } from './Role';

@Entity({ name: 'account' })
export class Account implements IAccount {
    @PrimaryGeneratedColumn('uuid', { name: 'account_id' })
    accountId!:string;

    @Column({ name: 'first_name', length: 50 })
    firstName!: string;

    @Column({ name: 'last_name', length: 100 })
    lastName!: string;

    @Column({ name: 'email', length: 100, unique: true })
    email!: string;

    @Column({ name: 'password', nullable: true, length: 60 })
    password?: string;

    @ManyToMany(() => Role, { eager: true })
    @JoinTable({
      name: 'account_roles',
      inverseJoinColumn: {
        name: 'role',
      },
      joinColumn: {
        name: 'account_id',
      },
    })
    roles!: Role[]

    @Column({ name: 'phone_number', nullable: true, length: 20, unique: true })
    phoneNumber?: string;

    @CreateDateColumn({ name: 'date_created' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated' })
    dateUpdated!: Date;

    @Column({ name: 'personal_identity_number', nullable: true, length: 20, unique: true })
    personalIdentityNumber?: string;

    constructor (a?:Optional<IAccount, 'accountId'>) {
      if (a) {
        this.accountId = a.accountId ?? v4();
        this.email = a.email;
        this.firstName = a.firstName;
        this.lastName = a.lastName;
        this.password = a.password ?? undefined;
        this.roles = a.roles ? a.roles.map(r => new Role(r)) : [];
        this.phoneNumber = a.phoneNumber ?? undefined;
        this.dateCreated = a.dateCreated;
        this.dateUpdated = a.dateUpdated;
        this.personalIdentityNumber = a.personalIdentityNumber;
      }
    }
}
