export default interface Titleable {
	readonly title: string;
}

export function isTitleable(candidate: unknown) {
	const result =
		Object.prototype.hasOwnProperty.call(candidate, "title") &&
		typeof (candidate as Titleable).title === "string";
	return result;
}
