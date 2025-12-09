import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/task/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { UserNotFoundException } from 'src/task/exceptions/usernotfound.exception';
import { JwtService } from '@nestjs/jwt';
import { PasswordNotMatchException } from 'src/task/exceptions/passwordnotmatch.exception';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepoService: Repository<User>, @Inject(JwtService) private readonly jwtService: JwtService) { }

    async signUp(signUpData: SignUpData): Promise<User> {
        const userId = uuid()
        const password = await bcrypt.hash(signUpData.password, 10)
        const user = this.userRepoService.create({ userId, password, email: signUpData.email, userName: signUpData.username })

        return this.userRepoService.save(user).then(data => data).catch(err => {
            throw err
        })
    }

    async signIn(signInData: SignInData): Promise<object> {

        const user: User | null = await this.userRepoService.findOne({ where: { email: signInData.email} })
        
        if(!user) throw new UserNotFoundException()

        const isAuthenticated: boolean = await bcrypt.compare(signInData.password, user.password);

        if(!isAuthenticated) throw new PasswordNotMatchException()

        const token = await this.jwtService.signAsync({username: user.userName, email: user.email})

        return {token};
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
