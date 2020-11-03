import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('characters')
class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.characters)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column()
  vocation: string;

  @Column()
  level: number;

  @Column()
  world: string;
}

export default Character;
