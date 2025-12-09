import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/task/db/entities/user.entity';
import { UserNotFoundException } from 'src/task/exceptions/usernotfound.exception';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepoService: Repository<User>) {}
    async getUID(email: string): Promise<string> {
        const user: User | null = await this.userRepoService.findOne({where: {email}})
        if(!user) throw new UserNotFoundException()

        return user.userId
    }

    async getUser(userId: string): Promise<User | null> {
        return await this.userRepoService.findOne({where: {userId}})
    }
}