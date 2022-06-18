export type CentiPrefix = "centi";

export type Unit<TName extends string, TSymbol extends string> = {
	name: TName;
	symbol: TSymbol;
};

export interface Measurement<TUnit extends Unit<string, string>> {
	unit: TUnit;
	value: number;
}

export interface Metric<TUnit extends Unit<string, string>> {
	readonly value: Measurement<TUnit>;
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

export const centiToKilo = (centis: number) => kilo(unCenti(centis));
export const kiloToCenti = (kilos: number) => centi(unKilo(kilos));
