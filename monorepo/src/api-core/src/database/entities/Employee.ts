import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { v4 } from 'uuid';
import { Account } from './Account';
import { Address } from './Address';
import { Optional } from '../../types/optional';
import { IEmployee } from '../../domain/entities/Employee';
import { IAccount } from '../../domain/entities/Account';
import { Constructor } from '../../domain/entities/Employee/types';
@Entity({ name: 'employee' })
export class Employee {
    @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
    employeeId!:string;

    @OneToOne(() => Account, { nullable: false, eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account!: IAccount;

    @OneToOne(() => Address, { nullable: true, eager: true, cascade: true })
    @JoinColumn({ name: 'address_id' })
    address?: Address;

    constructor (data?: Optional<IEmployee, 'employeeId'>) {
      if (data) {
        this.employeeId = data.employeeId ?? v4();
        this.account = new Account(data.account);
        this.address = data.address ? new Address(data.address) : undefined;
      }
    }
}

@Entity({ name: 'employee' })
export class EmployeeLight {
    @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
    employeeId!:string;

    @Column('uuid', { name: 'account_id' })
    accountId!: string;

    @OneToOne(() => Account, { nullable: false, eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account?: IAccount;

    @OneToOne(() => Address, { nullable: true, eager: true, cascade: true })
    @JoinColumn({ name: 'address_id' })
    address?: Address;

    @Column('uuid', { name: 'address_id', nullable: true })
    addressId?: string;

    constructor (data?: Constructor) {
      if (data) {
        this.employeeId = data.employeeId ?? v4();
        this.account = new Account(data.account);
        this.accountId = data.account?.accountId ?? data.accountId!;
        this.address = new Address(data.address);
        this.addressId = data.address?.addressId ?? data.addressId;
      }
    }
}
