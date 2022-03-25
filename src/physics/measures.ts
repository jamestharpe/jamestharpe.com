export interface Unit {
	name: string;
	symbol: string;
}

export default class Measurement {
	constructor(public readonly quantity: number, public readonly unit: Unit) {}
}

export interface Metric {
	readonly value: Measurement;
}

export const KILO = 10 ** 3;
export const CENTI = 10 ** -2;
export const MILLI = 10 ** -3;

export const kilo = (quantity: number) => quantity / KILO;
export const centi = (quantity: number) => quantity / CENTI;
export const milli = (quantity: number) => quantity / MILLI;

export const unKilo = (quantity: number) => quantity * KILO;
export const unCenti = (quantity: number) => quantity * CENTI;
export const unMilli = (quantity: number) => quantity * MILLI;
