import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { IAddon } from '../../domain/entities/Addon';
import { Unit } from '../../domain/entities/Addon/IAddon';
import { Optional } from '../../types/optional';

@Entity({ name: 'addon' })
export class Addon implements IAddon {
  @PrimaryGeneratedColumn('uuid', { name: 'addon_id' })
  addonId!: string;

  @Column('varchar', { name: 'name', length: 100 })
  name!: string;

  @Column('varchar', { name: 'description', length: 1000 })
  description!: string;

  @Column({ name: 'unit', length: '20' })
  unit!: Unit;

  @Column('int', { name: 'default_time_in_minutes' })
  defaultTimeInMinutes!: number;

  constructor (a?: Optional<IAddon, 'addonId'>) {
    if (a) {
      this.addonId = a.addonId ?? v4();
      this.name = a.name;
      this.description = a.description;
      this.unit = a.unit;
      this.defaultTimeInMinutes = a.defaultTimeInMinutes;
    }
  }
}
