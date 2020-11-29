import { CommentEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommentInput } from '@/type/comment.type';

@Injectable()
export class CommonCommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  public async getComment(commentId: number): Promise<CommentEntity> {
    const user: CommentEntity = await this.commentRepository.findOneOrFail({
      id: commentId,
      deletedAt: null,
    });

    return user;
  }

  public async getCommentListByPostId(
    postId: number,
  ): Promise<CommentEntity[]> {
    const comments: CommentEntity[] = await this.commentRepository.find({
      where: {
        postId,
        deletedAt: null,
      },
    });

    return comments;
  }

  public async saveComment(comment: ICommentInput): Promise<boolean> {
    await this.commentRepository.save(comment);

    return true;
  }

  public async deleteComment(commentId: number): Promise<boolean> {
    await this.commentRepository.softDelete(commentId);

    return true;
  }
}