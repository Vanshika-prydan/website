import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { ICustomerAddress } from '../../domain/entities/CustomerAddress';
import { Optional } from '../../types/optional';
import { Address } from './Address';
import { Customer } from './Customer';

@Entity({ name: 'customer_address' })
export class CustomerAddress implements ICustomerAddress {
    @PrimaryGeneratedColumn('uuid', { name: 'customer_address_id' })
    customerAddressId!: string;

    @Column('bool', { name: 'is_primary_address', default: true })
    isPrimaryAddress!: boolean;

    @OneToOne(() => Address, { nullable: false, eager: true, onDelete: 'CASCADE', cascade: true })
    @JoinColumn({ name: 'address_id' })
    address!: Address;

    @ManyToOne(() => Customer, customer => customer.addresses, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer!:Customer;

    @Column('int', { name: 'number_of_bathrooms', nullable: true })
    numberOfBathrooms?: number;

    @Column('int', { name: 'home_area_in_m2', nullable: true })
    homeAreaInM2?: number;

    constructor (c?:Optional<ICustomerAddress, 'customerAddressId'>) {
      if (c) {
        this.customerAddressId = c.customerAddressId ?? v4();
        this.isPrimaryAddress = c.isPrimaryAddress;
        this.address = new Address(c.address);
        this.numberOfBathrooms = c.numberOfBathrooms ?? undefined;
        this.homeAreaInM2 = c.homeAreaInM2 ?? undefined;
      }
    }
}
