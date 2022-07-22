// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2019  James Tharpe

import Identifiable from "./identifiable";

/**
 * Something with a numeric priority.
 */
export interface Prioritizable extends Identifiable {
	higherPriorityId: number;
}

export function isPrioritizable(candidate: unknown) {
	const result =
		Object.prototype.hasOwnProperty.call(candidate, "priority") &&
		typeof (candidate as Prioritizable).higherPriorityId === "number";
	return result;
}

/**
 * A function that takes an object and returns a numeric priority
 */
export interface Prioritizer<T> {
	(item: T): number;
}

/**
 * Returns a numeric priority for the given Priority object
 * @param prioritizable The item to have its priority determined
 */
export const prioritizer: Prioritizer<Prioritizable> = (prioritizable) =>
	prioritizable.higherPriorityId;

/**
 * The given set of objects, ordered by their numeric priority
 * @param prioritizer The Prioritizer function
 * @param priorities The items to prioritize
 */
export function sortByPriority<T>(
	prioritizer: Prioritizer<T>,
	...priorities: T[]
) {
	return priorities.sort((a, b) => prioritizer(a) - prioritizer(b));
}

export function earliest<T>(
	prioritizer: Prioritizer<T>,
	priorities: T[]
): number {
	return priorities
		.map(prioritizer)
		.reduce((priority, candidate) => Math.min(priority, candidate), 0);
}
