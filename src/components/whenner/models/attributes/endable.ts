import { isDate } from "../../time";

export interface Endable {
	end: Date;
}

export function isEndable(candidate: unknown) {
	return (
		Object.prototype.hasOwnProperty.call(candidate, "end") &&
		isDate((candidate as Endable).end)
	);
}
