import Measurement, { kilo, Metric, unCenti, Unit, unKilo } from "./measures";

export const centimeter: Unit = {
	name: "centimeter",
	symbol: "cm"
};

export const meter: Unit = {
	name: "meter",
	symbol: "m"
};

export const kilometer: Unit = {
	name: "kilometer",
	symbol: "km"
};

export default class Distance implements Metric {
	public static symbol = "d";

	constructor(centimeters: number) {
		this.value = new Measurement(centimeters, centimeter);
	}

	static inCentimeters = (quantity: number) => new Distance(quantity);
	static inMeters = (quantity: number) => new Distance(unCenti(quantity));
	static inKilometers = (quantity: number) =>
		new Distance(unCenti(unKilo(quantity)));

	public readonly value: Measurement;

	public get centimeters(): Measurement {
		return new Measurement(this.value.quantity, this.value.unit);
	}

	public get meters(): Measurement {
		return new Measurement(unCenti(this.value.quantity), meter);
	}

	public get kilometers(): Measurement {
		return new Measurement(kilo(this.meters.quantity), kilometer);
	}
}
