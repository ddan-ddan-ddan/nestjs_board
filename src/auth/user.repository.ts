import { Repository } from "typeorm";
import { CustomRepository } from "src/boards/typeorm-ex.decorator";
import { User } from "./user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {

}