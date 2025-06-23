import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  login: string;

  @Column()
  password: string;

  @Column()
  token: string;
}
