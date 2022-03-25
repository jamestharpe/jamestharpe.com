import Measurement, { kilo, Metric, Unit, unKilo } from "./measures";

export const GRAMS_PER = {
	POUND: 0.00220462
};

export const POUNDS_PER = {
	GRAM: 453.59237
};

export const gram: Unit = {
	name: "gram",
	symbol: "g"
};

export const kilogram: Unit = {
	name: "kilogram",
	symbol: "kg"
};

export const pound: Unit = {
	name: "pound",
	symbol: "lbs"
};

export const MassUnit = {
	gram,
	kilogram,
	pound
};

export type UnitOfMass = keyof typeof MassUnit;

export default class Mass implements Metric {
	public static readonly symbol = "M";

	constructor(grams: number) {
		this.value = new Measurement(grams, gram);
	}

	static inGrams = (quantity: number) => new Mass(quantity);
	static inKilograms = (quantity: number) => new Mass(unKilo(quantity));
	static inPounds = (quantity: number) => new Mass(quantity * POUNDS_PER.GRAM);

	public readonly value: Measurement;

	public get grams(): Measurement {
		return this.value;
	}

	public get kilograms(): Measurement {
		return new Measurement(kilo(this.grams.quantity), kilogram);
	}

	public get pounds(): Measurement {
		return new Measurement(this.grams.quantity * GRAMS_PER.POUND, pound);
	}
}
