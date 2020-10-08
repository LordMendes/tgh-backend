import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import Member from './Member';

@Entity('guilds')
class Guild {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  whatsapp: string;

  @Column()
  discord: string;

  @Column()
  teamspeak: string;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Member, member => member.guildId)
  members: Member[];
}

export default Guild;
