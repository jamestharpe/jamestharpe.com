// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import { isDate } from "../../time";

/**
 * A Completable object has a `completed` date property
 */
export interface Completable {
	completed: Date | null;
}

export function complete<TCompletable extends Completable>(
	completables: TCompletable[]
): TCompletable[] {
	return completables.filter((completable) => completable.completed);
}

export function incomplete<TCompletable extends Completable>(
	completables: TCompletable[]
): TCompletable[] {
	return completables.filter((completable) => !completable.completed);
}

export function isCompletable(candidate: unknown): boolean {
	const result =
		Object.prototype.hasOwnProperty.call(candidate, "completed") &&
		(isDate((candidate as Completable).completed) ||
			(candidate as Completable).completed === null);
	// console.log("isCompletable", { candidate, result });
	return result;
}
