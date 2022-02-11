import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { ICustomer } from '../../domain/entities/Customer';
import { Optional } from '../../types/optional';
import { Account } from './Account';
import { CustomerAddress } from './CustomerAddress';

@Entity({ name: 'customer' })
export class Customer implements ICustomer {
    @PrimaryGeneratedColumn('uuid', { name: 'customer_id' })
    customerId!: string;

    @OneToOne(() => Account, { nullable: false, eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account!: Account;

    @OneToMany(() => CustomerAddress, ca => ca.customer, { nullable: true, eager: true, cascade: true })
    addresses?: CustomerAddress[];

    @Column('boolean', { name: 'receive_marketing_communication', default: false })
    receiveMarketingCommunication!: boolean;

    @Column({ name: 'stripe_id', nullable: true })
    stripeId?: string;

    constructor (c?:Optional<ICustomer, 'customerId'>) {
      if (c) {
        this.customerId = c.customerId ?? v4();
        this.account = new Account(c.account);
        this.addresses = c.addresses?.map(address => new CustomerAddress(address)) ?? undefined;
        this.receiveMarketingCommunication = c.receiveMarketingCommunication;
        this.stripeId = c.stripeId;
      }
    }
}
