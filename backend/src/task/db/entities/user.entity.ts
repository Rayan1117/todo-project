import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity({name: "TodoUsers"})
export class User {
    @PrimaryColumn({name: 'user_id'})
    userId: string

    @Column({unique: true})
    email: string

    @Column({name: 'user_name'})
    userName: string

    @Column()
    password: string

    @OneToMany(() => Task, (task: Task) => task.taskId)
    tasks: Task[]
}