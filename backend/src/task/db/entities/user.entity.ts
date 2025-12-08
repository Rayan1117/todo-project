import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: "TodoUsers"})
export class User {
    @PrimaryColumn({name: 'user_id'})
    userId: string

    @Column({name: 'user_name'})
    userName: string
}