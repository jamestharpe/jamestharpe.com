import {
	centi,
	centiToKilo,
	kilo,
	Measurement,
	unCenti,
	Unit,
	unKilo
} from "./measures";

export const centimeter: Unit<"centimeter", "cm"> = {
	name: "centimeter",
	symbol: "cm"
};

export type Centimeter = typeof centimeter;

export const inch: Unit<"inch", "in"> = {
	name: "inch",
	symbol: "in"
};

export type Inch = typeof inch;

export const foot: Unit<"foot", "ft"> = {
	name: "foot",
	symbol: "ft"
};

export type Foot = typeof inch;

export const meter: Unit<"meter", "m"> = {
	name: "meter",
	symbol: "m"
};

export type Meter = typeof meter;

export const kilometer: Unit<"kilometer", "km"> = {
	name: "kilometer",
	symbol: "km"
};

export type Kilometer = typeof kilometer;

export type DistanceUnit = Centimeter | Inch | Meter | Kilometer;
export type DistanceUnitName = DistanceUnit["name"];
export type DistanceUnitSymbol = DistanceUnit["symbol"];

export interface DistanceMeasurement extends Measurement<DistanceUnit> {
	inCentimeters(): DistanceMeasurement;
	inInches(): DistanceMeasurement;
	inMeters(): DistanceMeasurement;
	inKilometers(): DistanceMeasurement;
}

export const INCHES_PER_METER = 39.3700787;

export function metersToInches(meters: number): number {
	return meters * INCHES_PER_METER;
}

export function inchesToMeters(inches: number): number {
	return inches / INCHES_PER_METER;
}

// distanceOf(300).cm.inMeters() => { value: 3, symbol: m, name: meters }
export function distanceOf(
	value: number
): Record<DistanceUnitSymbol, DistanceMeasurement> {
	return {
		cm: {
			value,
			unit: centimeter,
			inCentimeters: () => distanceOf(value).cm,
			inInches: () => distanceOf(metersToInches(unCenti(value))).in,
			inMeters: () => distanceOf(unCenti(value)).m,
			inKilometers: () => distanceOf(centiToKilo(value)).km
		},
		in: {
			value,
			unit: inch,
			inCentimeters: () => distanceOf(centi(inchesToMeters(value))).cm,
			inInches: () => distanceOf(value).in,
			inMeters: () => distanceOf(unCenti(value)).m,
			inKilometers: () => distanceOf(centiToKilo(value)).km
		},
		m: {
			value,
			unit: meter,
			inCentimeters: () => distanceOf(centi(value)).cm,
			inInches: () => distanceOf(metersToInches(value)).in,
			inMeters: () => distanceOf(value).m,
			inKilometers: () => distanceOf(kilo(value)).km
		},
		km: {
			value,
			unit: kilometer,
			inCentimeters: () => distanceOf(centi(value)).cm,
			inInches: () => distanceOf(metersToInches(unKilo(value))).in,
			inMeters: () => distanceOf(value).m,
			inKilometers: () => distanceOf(kilo(value)).km
		}
	};
}

// export default class Distance implements DistanceMeasurement {
// 	public static symbol = "d";

// 	constructor(centimeters: number) {
// 		this.measure = distanceOf(centimeters).cm;
// 	}

// 	inCentimeters(): DistanceMeasurement {
// 		throw new Error("Method not implemented.");
// 	}
// 	inMeters(): DistanceMeasurement {
// 		throw new Error("Method not implemented.");
// 	}
// 	inKilometers(): DistanceMeasurement {
// 		throw new Error("Method not implemented.");
// 	}

// 	unit: DistanceUnit;
// 	value: number;

// 	static inCentimeters = (quantity: number) => new Distance(quantity);
// 	static inMeters = (quantity: number) => new Distance(unCenti(quantity));
// 	static inKilometers = (quantity: number) =>
// 		new Distance(unCenti(unKilo(quantity)));

// 	public readonly measure: DistanceMeasurement;

// 	public get centimeters(): DistanceMeasurement {
// 		return new Measurement(this.measure.quantity, this.value.unit);
// 	}

// 	public get meters(): DistanceMeasurement {
// 		return new Measurement(unCenti(this.measure.quantity), meter);
// 	}

// 	public get kilometers(): DistanceMeasurement {
// 		return new Measurement(kilo(this.meters.quantity), kilometer);
// 	}
// }
