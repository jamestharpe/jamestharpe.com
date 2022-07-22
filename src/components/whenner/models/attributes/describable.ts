export default interface Describable {
	readonly description: string;
}

export function isDescribable(candidate: unknown) {
	const result =
		Object.prototype.hasOwnProperty.call(candidate, "description") &&
		typeof (candidate as Describable).description === "string";
	return result;
}
