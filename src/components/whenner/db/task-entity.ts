// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import Task, { emptyTask } from "../models/task";

// @Entity()
// export default class TaskEntity implements Task {
// 	constructor(task: Partial<Task> = {}) {
// 		Object.assign(this, task, emptyTask);
// 	}

// 	// TODO: predecessorIds?: number[] | undefined;

// 	// @Column()
// 	supertaskId?: number | undefined;

// 	@PrimaryGeneratedColumn()
// 	id!: number;

// 	@Column({ type: "nvarchar", length: 512 })
// 	title!: string;

// 	@Column({ type: "text" })
// 	description!: string;

// 	@Column({ type: "datetime" })
// 	canceled!: Date | null;

// 	// @Column()
// 	higherPriorityId!: number;

// 	@Column({ type: "int" })
// 	estimate!: number;

// 	@Column({ type: "datetime" })
// 	completed!: Date | null;
// }
