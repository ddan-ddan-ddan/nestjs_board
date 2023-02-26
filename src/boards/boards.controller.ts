import { Body, Controller, Delete, Get, Param, ParseIntPipe, Logger, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decoreator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
@UseGuards(AuthGuard()) //모든 핸들러가 영향을 받음. 토큰이 있어야 가능하게끔
export class BoardsController {
    private logger = new Logger('BoardsController');
    constructor(
        private boardsService: BoardsService) {}

    @Get()
    getAll(): Promise<Board[]> {
        return this.boardsService.getAll();
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User): Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board.
        Payload: ${JSON.stringify(createBoardDto)}}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {//ParseIntPipe: 파라미터가 숫자로 잘 되어서 오는지. 
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status') status: BoardStatus
    ) {
        console.log("contorller", status);
        return this.boardsService.updateBoardStatus(id, status);
    }
}
