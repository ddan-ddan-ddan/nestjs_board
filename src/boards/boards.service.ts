import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ) {}

    async getAll(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({id}); //여기서 오류가 납니다.
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log(result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.update(id, board);
        return await this.boardRepository.findOneBy({id});

    }
}
