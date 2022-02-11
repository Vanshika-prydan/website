import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { Account } from './Account';
import { Optional } from '../../types/optional';
import { IAccountNotification } from '../../domain/entities/AccountNotification/interface';

@Entity({ name: 'account_notification' })
export class AccountNotification implements IAccountNotification {
    @PrimaryGeneratedColumn('uuid', { name: 'account_notification_id' })
    accountNotificationId!: string;

    @ManyToOne(() => Account, account => account.accountId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account!: Account;

    @Column({ name: 'token' })
    token!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    constructor (data?:Optional<IAccountNotification, 'accountNotificationId'>) {
      if (data) {
        this.accountNotificationId = data.accountNotificationId ?? v4();
        this.account = new Account(data.account);
        this.token = data.token;
        this.createdAt = data.createdAt;
      }
    }
}
