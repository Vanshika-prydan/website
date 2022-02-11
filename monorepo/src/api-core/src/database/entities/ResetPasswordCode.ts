import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { ResetPasswordCodeInterface } from '../../domain/entities/ResetPasswordCode';
import { Optional } from '../../types/optional';
@Entity()
export class ResetPasswordCode implements ResetPasswordCodeInterface {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'account_id' })
    accountId!: string;

    @Column()
    token!: string;

    @Column()
    code!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    constructor (d?: Optional<ResetPasswordCodeInterface, 'id'>) {
      if (d) {
        this.id = d.id ?? v4();
        this.accountId = d.accountId;
        this.token = d.token;
        this.code = d.code;
        this.createdAt = d.createdAt;
      }
    }
}
