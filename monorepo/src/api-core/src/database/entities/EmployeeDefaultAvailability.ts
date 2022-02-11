import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WeekDayType, EmployeeDefaultAvailabilityInterface, WeekDayEnum } from '../../domain/entities/EmployeeDefaultAvailability';
import { Employee } from './Employee';

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

@Entity({ name: 'employee_default_availability' })
export default class EmployeeDefaultAvailability implements EmployeeDefaultAvailabilityInterface {
  @PrimaryColumn('uuid', { name: 'employee_id' })
  employeeId!: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE', primary: true, nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employee?: Employee;

  @PrimaryColumn('enum', { type: 'enum', enum: WeekDayEnum, enumName: 'week_day', nullable: false, name: 'day' })
  day!: WeekDayType;

  @Column('int', { name: 'start_hour', default: 7 })
  startHour!: number;

  @Column('int', { name: 'start_minute', default: 0 })
  startMinute!: number;

  @Column('int', { name: 'end_hour', default: 18 })
  endHour!: number;

  @Column('int', { name: 'end_minute', default: 0 })
  endMinute!: number;

  constructor (payload?:MakeOptional<EmployeeDefaultAvailabilityInterface, 'startMinute' | 'endMinute'>) {
    if (payload) {
      this.employeeId = payload.employeeId;
      this.employee = payload.employee ? new Employee(payload.employee) : undefined;
      this.day = payload.day;
      this.startHour = payload.startHour;
      this.startMinute = payload.startMinute ?? 0;
      this.endHour = payload.endHour;
      this.endMinute = payload.endMinute ?? 0;
    }
  }
}
