import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty() //title이 빈칸이면 오류를 내보냄
    title: string;
    
    @IsNotEmpty() //description이 빈칸이면 오류를 내보냄
    description: string;
}