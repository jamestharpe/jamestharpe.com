import { kilo, Measurement, Unit, unKilo } from "./measures";

export const GRAMS_PER_POUND = 453.59237;
export const POUNDS_PER_GRAM = 0.00220462;

export const gram: Unit<"gram", "g"> = {
	name: "gram",
	symbol: "g"
};

export type Gram = typeof gram;

export const kilogram: Unit<"kilogram", "kg"> = {
	name: "kilogram",
	symbol: "kg"
};

export type Kilogram = typeof kilogram;

export const pound: Unit<"pound", "lbs"> = {
	name: "pound",
	symbol: "lbs"
};

export type Pound = typeof pound;

export type MassUnit = Gram | Kilogram | Pound;
export type MassUnitName = MassUnit["name"];
export type MassUnitSymbol = MassUnit["symbol"];

export const MassUnits = [gram, kilogram, pound];

export interface MassMeasurement extends Measurement<MassUnit> {
	inGrams(): MassMeasurement;
	inKilograms(): MassMeasurement;
	inPounds(): MassMeasurement;
}

export function poundsToGrams(pounds: number): number {
	return pounds * GRAMS_PER_POUND;
}

export function poundsToKilograms(pounds: number): number {
	return kilo(poundsToGrams(pounds));
}

export function gramsToPounds(grams: number): number {
	return grams * POUNDS_PER_GRAM;
}

export function kilogramsToPounds(kilograms: number): number {
	return gramsToPounds(unKilo(kilograms));
}

// massOf(3000).g.inKilograms() => { value: 3, symbol: kg, name: kilograms }
export function massOf(value: number): Record<MassUnitSymbol, MassMeasurement> {
	return {
		g: {
			value,
			unit: gram,
			inGrams: () => massOf(value).g,
			inKilograms: () => massOf(kilo(value)).kg,
			inPounds: () => massOf(gramsToPounds(value)).lbs
		},
		kg: {
			value,
			unit: kilogram,
			inGrams: () => massOf(unKilo(value)).g,
			inKilograms: () => massOf(value).kg,
			inPounds: () => massOf(kilogramsToPounds(value)).lbs
		},
		lbs: {
			value,
			unit: pound,
			inGrams: () => massOf(value * POUNDS_PER_GRAM).g,
			inKilograms: () => massOf(poundsToKilograms(value)).kg,
			inPounds: () => massOf(value).lbs
		}
	};
}

// export default class Mass implements Metric {
// 	public static readonly symbol = "M";

// 	constructor(grams: number) {
// 		this.value = new Measurement(grams, gram);
// 	}

// 	static inGrams = (quantity: number) => new Mass(quantity);
// 	static inKilograms = (quantity: number) => new Mass(unKilo(quantity));
// 	static inPounds = (quantity: number) => new Mass(quantity * POUNDS_PER.GRAM);

// 	public readonly value: Measurement;

// 	public get grams(): Measurement {
// 		return this.value;
// 	}

// 	public get kilograms(): Measurement {
// 		return new Measurement(kilo(this.grams.quantity), kilogram);
// 	}

// 	public get pounds(): Measurement {
// 		return new Measurement(this.grams.quantity * GRAMS_PER.POUND, pound);
// 	}
// }
