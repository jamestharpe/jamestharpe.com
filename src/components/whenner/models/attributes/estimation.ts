// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import { Endable, isEndable } from "./endable";
import { isStartable, Startable } from "./startable";

export interface Estimable {
	readonly estimate: number;
}

export type StartEstimable = Startable & Estimable;
export type EndEstimable = Endable & Estimable;

export function isEstimable(candidate: unknown) {
	const result =
		Object.prototype.hasOwnProperty.call(candidate, "estimate") &&
		typeof (candidate as Estimable).estimate === "number";
	return result;
}

export function isStartEstimable(candidate: unknown) {
	return isStartable(candidate) && isEstimable(candidate);
}

export function isEndEstimable(candidate: unknown) {
	return isEndable(candidate) && isEstimable(candidate);
}

export function estimated(item: unknown | Estimable): Estimable | undefined {
	const { estimate = undefined } = (item as Estimable) || {};
	return estimate || estimate === 0 ? (item as Estimable) : undefined;
}
