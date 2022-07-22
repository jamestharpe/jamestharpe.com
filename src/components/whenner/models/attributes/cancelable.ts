import { isDate } from "moment";

export default interface Cancelable {
	canceled: Date | null;
}

export function isCancelable(candidate: unknown) {
	const result =
		Object.prototype.hasOwnProperty.call(candidate, "canceled") &&
		(isDate((candidate as Cancelable).canceled) ||
			typeof (candidate as Cancelable).canceled === "undefined");
	console.log("isCancelable", { candidate, result });
	return result;
}

export function isCanceled(statusable: Partial<Cancelable>): boolean {
	return !!statusable.canceled;
}
