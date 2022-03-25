import Measurement, { Metric, milli, Unit } from "./measures";

export const millisecond: Unit = {
	name: "millisecond",
	symbol: "ms"
};

export const second: Unit = {
	name: "second",
	symbol: "s"
};

export const minute: Unit = {
	name: "minute",
	symbol: "m"
};

export const SECONDS_PER = {
	MINUTE: 60
};

export default class Time implements Metric {
	public static symbol = "t";

	constructor(seconds: number) {
		this.value = new Measurement(seconds, second);
	}

	static inSeconds(seconds: number) {
		return new Time(seconds);
	}

	public readonly value: Measurement;

	public get milliseconds(): Measurement {
		return new Measurement(milli(this.value.quantity), millisecond);
	}

	public get seconds(): Measurement {
		return this.value;
	}

	public get minutes(): Measurement {
		return new Measurement(this.value.quantity / SECONDS_PER.MINUTE, minute);
	}
}

export const seconds = (quantity: number) => new Time(quantity);
