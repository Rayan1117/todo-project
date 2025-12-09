import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/task/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { UserNotFoundException } from 'src/task/exceptions/usernotfound.exception';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepoService: Repository<User>) { }

    async signUp(signUpData: SignUpData): Promise<User> {
        const userId = uuid()
        const password = await bcrypt.hash(signUpData.password, 10)
        const user = this.userRepoService.create({ userId, password, email: signUpData.email, userName: signUpData.username })

        return this.userRepoService.save(user).then(data => data).catch(err => {
            throw err
        })
    }

    async signIn(signInData: SignInData): Promise<User> {
        const user: User | null = await this.userRepoService.findOne({ where: { email: signInData.email, password: signInData.password } })

        if (!user) throw new UserNotFoundException()

        return user
    }
}

interface SignUpData {
    email: string
    password: string
    username: string
}

interface SignInData {
    email: string,
    password: string
}