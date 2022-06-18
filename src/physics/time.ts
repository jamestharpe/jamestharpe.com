import { Unit } from "./measures";

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

export type TimeUnit = Millisecond | Second | Minute;

export const SECONDS_PER = {
	MINUTE: 60
};

// export default class Time implements Metric {
// 	public static symbol = "t";

// 	constructor(seconds: number) {
// 		this.value = new Measurement(seconds, second);
// 	}

// 	static inSeconds(seconds: number) {
// 		return new Time(seconds);
// 	}

// 	public readonly value: Measurement;

// 	public get milliseconds(): Measurement {
// 		return new Measurement(milli(this.value.quantity), millisecond);
// 	}

// 	public get seconds(): Measurement {
// 		return this.value;
// 	}

// 	public get minutes(): Measurement {
// 		return new Measurement(this.value.quantity / SECONDS_PER.MINUTE, minute);
// 	}
// }

// export const seconds = (quantity: number) => new Time(quantity);
