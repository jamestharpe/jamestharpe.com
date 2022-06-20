import { Measurement, Unit, unMilli } from "./measures";

export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;

export const MILLISECONDS_PER_MINUTE =
	MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
export const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
export const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;

export const millisecond: Unit<"millisecond", "ms"> = {
	name: "millisecond",
	symbol: "ms"
};

export type Millisecond = typeof millisecond;

export const second: Unit<"second", "s"> = {
	name: "second",
	symbol: "s"
};

export type Second = typeof second;

export const minute: Unit<"minute", "m"> = {
	name: "minute",
	symbol: "m"
};

export type Minute = typeof minute;

export const hour: Unit<"hour", "h"> = {
	name: "hour",
	symbol: "h"
};

export type Hour = typeof hour;

export type TimeUnit = Millisecond | Second | Minute | Hour;

export type TimeUnitName = TimeUnit["name"];
export type TimeUnitSymbol = TimeUnit["symbol"];

export interface TimeMeasurement extends Measurement<TimeUnit> {
	inMilliseconds(): TimeMeasurement;
	inSeconds(): TimeMeasurement;
	inMinutes(): TimeMeasurement;
	inHours(): TimeMeasurement;
}

export function millisecondsToMinutes(milliseconds: number): number {
	return milliseconds / MILLISECONDS_PER_MINUTE;
}

export function millisecondsToHours(milliseconds: number): number {
	return milliseconds / MILLISECONDS_PER_HOUR;
}

export function secondsToMilliseconds(seconds: number): number {
	return seconds * MILLISECONDS_PER_SECOND;
}

export function secondsToMinutes(seconds: number): number {
	return seconds / SECONDS_PER_MINUTE;
}

export function secondsToHours(seconds: number): number {
	return seconds / SECONDS_PER_HOUR;
}

export function minutesToMilliseconds(minutes: number): number {
	return minutes * MILLISECONDS_PER_MINUTE;
}

export function minutesToSeconds(minutes: number): number {
	return minutes * SECONDS_PER_MINUTE;
}

export function minutesToHours(minutes: number): number {
	return minutes / MINUTES_PER_HOUR;
}

export function hoursToMilliseconds(hours: number): number {
	return hours * MILLISECONDS_PER_HOUR;
}

export function hoursToSeconds(hours: number): number {
	return hours * SECONDS_PER_HOUR;
}

export function hoursToMinutes(hours: number): number {
	return hours * MINUTES_PER_HOUR;
}

export function timeOf(value: number): Record<TimeUnitSymbol, TimeMeasurement> {
	return {
		ms: {
			value,
			unit: millisecond,
			inMilliseconds: () => timeOf(value).ms,
			inSeconds: () => timeOf(unMilli(value)).s,
			inMinutes: () => timeOf(millisecondsToMinutes(value)).m,
			inHours: () => timeOf(millisecondsToHours(value)).h
		},
		s: {
			value,
			unit: second,
			inMilliseconds: () => timeOf(secondsToMilliseconds(value)).ms,
			inSeconds: () => timeOf(value).s,
			inMinutes: () => timeOf(secondsToMinutes(value)).m,
			inHours: () => timeOf(secondsToHours(value)).h
		},
		m: {
			value,
			unit: minute,
			inMilliseconds: () => timeOf(minutesToMilliseconds(value)).ms,
			inSeconds: () => timeOf(minutesToSeconds(value)).s,
			inMinutes: () => timeOf(value).m,
			inHours: () => timeOf(minutesToHours(value)).h
		},
		h: {
			value,
			unit: hour,
			inMilliseconds: () => timeOf(hoursToMilliseconds(value)).ms,
			inSeconds: () => timeOf(hoursToSeconds(value)).s,
			inMinutes: () => timeOf(hoursToMinutes(value)).m,
			inHours: () => timeOf(value).h
		}
	};
}
