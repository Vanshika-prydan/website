import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { CountryCode } from '../../domain/entities/CountryCode';
import { IAddress } from '../../domain/entities/Address';
import { Optional } from '../../types/optional';

@Entity({ name: 'address' })
export class Address implements IAddress {
  @PrimaryGeneratedColumn('uuid', { name: 'address_id' })
  addressId!: string;

  @Column({ name: 'street', length: 100 })
  street!: string;

  @Column({ name: 'postal_code', length: 5 })
  postalCode!: string;

  @Column({ name: 'country_code', length: 2 })
  country: CountryCode = 'SE';

  @Column({ name: 'postal_city', length: 50 })
  postalCity!: string;

  @Column({ name: 'address_name', length: 40, nullable: true })
  addressName?: string;

  @Column({ name: 'information', length: 2000, nullable: true })
  information?: string;

  @Column({ name: 'code', length: 20, nullable: true })
  code?: string;

  constructor (a?:Optional<IAddress, 'addressId'>) {
    if (a) {
      this.addressId = a.addressId ?? v4();
      this.street = a.street;
      this.postalCode = a.postalCode;
      this.country = a.country;
      this.postalCity = a.postalCity;
      this.addressName = a.addressName ?? undefined;
      this.information = a.information ?? undefined;
      this.code = a.code ?? undefined;
    }
  }
}
