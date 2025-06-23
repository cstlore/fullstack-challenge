import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'likes' })
@Index(['cat_id', 'user_login'], { unique: true })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cat_id: string;

  @Column({ nullable: true })
  user_login: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
