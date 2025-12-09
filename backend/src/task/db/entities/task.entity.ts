import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'Tasks' })
export class Task {
    @PrimaryColumn({ name: 'task_id' })
    taskId: string;

    @Column({ name: 'task_name' })
    taskName: string;

    @Column({ name: 'task_desc' })
    taskDescription: string;

    @Column({ name: 'stored_at' })
    storedAt: string;

    @Column({ name: 'is_completed' })
    isCompleted: boolean;

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
