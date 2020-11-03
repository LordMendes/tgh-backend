import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import Guild from './Guild';
import User from './User';

@Entity('members')
class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  job: string;

  @Column()
  privilege: string;

  @Column()
  accepted: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Guild, guild => guild.members)
  @JoinColumn({ name: 'guild_id' })
  guildId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Member;
