import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Task } from "../entities/task.entity";

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: '103.207.1.91',
    database: 'CSE8882',
    username: 'MZCET',
    password: 'MZCET@1234',
    entities: [User, Task],
    synchronize: false,
    options: {
        trustServerCertificate: true,
        encrypt: true
    }
}