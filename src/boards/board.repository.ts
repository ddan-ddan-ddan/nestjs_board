import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";
import { CustomRepository } from "./typeorm-ex.decorator";
import { InjectRepository } from "@nestjs/typeorm";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
	constructor(@InjectRepository(Board) private dataSource: DataSource) {
        super(Board, dataSource.manager)
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });
        await this.save(board);
        return board;
    }
}