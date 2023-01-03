import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Privacy } from '@/enums/Privacy';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  article: string;

  @Column({
    type: 'enum',
    enum: Privacy,
    default: Privacy.OPEN,
  })
  privacy: Privacy;

  @Column({
    type: 'datetime',
    default: () => 'now()',
    precision: 0,
  })
  created_at: string;

  @Column({
    type: 'datetime',
    default: () => 'now()',
    onUpdate: 'now()',
    precision: 0,
  })
  updated_at: string;
}
