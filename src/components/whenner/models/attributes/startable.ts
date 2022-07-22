import { isDate } from "../../time";

export interface Startable {
	readonly start: Date;
}

export function isStartable(candidate: unknown): boolean {
	return (
		Object.prototype.hasOwnProperty.call(candidate, "start") &&
		isDate((candidate as Startable).start)
	);
}
