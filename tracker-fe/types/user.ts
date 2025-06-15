import { Task } from './task';

export type User = {
	id: string;
	email: string;
	password: string;
	tasks?: Task[];
};
