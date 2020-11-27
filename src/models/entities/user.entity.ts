import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @OneToMany(
    type => PostEntity,
    entity => entity.user,
  )
  posts: PostEntity[];

  @OneToMany(
    type => CommentEntity,
    entity => entity.user,
  )
  comments: CommentEntity[];

  @OneToMany(
    type => LikeEntity,
    entity => entity.users,
  )
  likes: LikeEntity[];
}
