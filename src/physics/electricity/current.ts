// import { ResistanceAndVoltage } from ".";
// import Measurement, { Metric, Unit } from "../measures";
// import Power from "../power";
// import Time, { seconds } from "../time";
// import Resistance, { ohms } from "./resistance";
// import Voltage from "./voltage";

// const ampere: Unit = {
// 	name: "ampere",
// 	symbol: "A"
// };
// export default class Current implements Metric {
// 	public static symbol = "I";

// 	constructor(coulombs: number, time: Time) {
// 		this.value = new Measurement(coulombs / time.seconds.quantity, ampere);
// 	}

// 	static inAmps(resistanceAndVoltage: ResistanceAndVoltage): Current;
// 	static inAmps(coulombsPerSecond: number): Current;
// 	static inAmps(quantity: number | ResistanceAndVoltage): Current {
// 		quantity =
// 			typeof quantity === "number"
// 				? quantity
// 				: quantity.voltage.volts.quantity / quantity.resistance.ohms;
// 		return new Current(quantity, seconds(1));
// 	}

// 	readonly value: Measurement;

// 	get amps(): Measurement {
// 		return this.value;
// 	}

// 	coulombs(time: Time): number {
// 		return this.amps.quantity * time.seconds.quantity;
// 	}

// 	power(voltage: Voltage): Power {
// 		return Power.inWatts(this.amps.quantity * voltage.volts.quantity);
// 	}

// 	resistance(voltage: Voltage): Resistance {
// 		return ohms(voltage.volts.quantity / this.amps.quantity);
// 	}

// 	time(coulombs: number) {
// 		return coulombs / this.amps.quantity;
// 	}

// 	voltage(resistance: Resistance): Voltage {
// 		return Voltage.inVolts({ current: this, resistance });
// 	}
// }
