import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService ) {}

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
    createBoard(@Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.createBoard(createBoardDto);
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
