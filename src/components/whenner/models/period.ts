// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2019 James Tharpe

import { MILLISECONDS_PER_MINUTE } from "../time";
import { Endable, isEndable } from "./attributes/endable";
import { isStartable, Startable } from "./attributes/startable";

/**
 * A period of time, with a discrete start and end
 */
type Period = Startable & Endable;

export default Period;

/**
 * Gets the period of the specified item, or undefined if none exists
 *
 * @export
 * @param {*} item the item to get the period of
 * @returns {(Period | undefined)}
 */
export function periodOf(item: unknown): Period | undefined {
	const { start = undefined, end = undefined } = (item as Period) || {};
	if (start instanceof Date && end instanceof Date) {
		return item as Period;
	}
	return undefined;
}

/**
 * Determines if two periods overlap
 *
 * @export
 * @param {Period} period1 the first period
 * @param {Period} period2 the second period
 * @returns true if the periods can be current at the same time (they overlap)
 */
export function periodsOverlap(period1: Period, period2: Period) {
	return (
		period1 &&
		period2 &&
		((period1.start < period2.start && period1.end > period2.start) ||
			(period1.start > period2.start && period1.start < period2.end))
	);
}

export function minutesIn(period: Period) {
	return (
		(period.end.getTime() - period.start.getTime()) / MILLISECONDS_PER_MINUTE
	);
}

export function isPeriod(candidate: unknown) {
	return isStartable(candidate) && isEndable(candidate);
}
