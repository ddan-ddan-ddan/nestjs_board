import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'master',
    password: 'dial123123',
    database: 'board_app',
    entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
    synchronize: true
}