// import { CurrentAndVoltage } from "./electricity";
// import Current from "./electricity/current";
// import Voltage from "./electricity/voltage";
// import Energy from "./energy";
// import Force from "./force";
// import Measurement, { Metric, Unit } from "./measures";
// import Time, { seconds } from "./time";
// import Velocity from "./velocity";

// export const watt: Unit = {
// 	name: "watt",
// 	symbol: "W"
// };

// /**
//  * P = FV, P = J/s. The rate at which energy is transferred over time.
//  *
//  * @export
//  * @class Power
//  * @implements {Metric}
//  */
// export default class Power implements Metric {
// 	static symbol = "P";

// 	constructor(public readonly force: Force, public readonly velocity: Velocity) {
// 		this.value = new Measurement(
// 			force.newtons.quantity * velocity.metersPerSecond.quantity,
// 			watt
// 		);
// 	}

// 	static inWatts(currentAndVoltage: CurrentAndVoltage): Power;
// 	static inWatts(kilograms: number): Power;
// 	static inWatts(quantity: number | CurrentAndVoltage): Power {
// 		quantity =
// 			typeof quantity === "number"
// 				? quantity
// 				: quantity.current.amps.quantity * quantity.voltage.volts.quantity;
// 		return new Power(Force.inNewtons(quantity), Velocity.inMetersPerSecond(1));
// 	}

// 	public readonly value: Measurement;

// 	public get watts(): Measurement {
// 		return this.value;
// 	}

// 	current(voltage: Voltage): Current {
// 		return Current.inAmps(this.watts.quantity / voltage.volts.quantity);
// 	}

// 	energy(time: Time): Energy {
// 		return Energy.inJoules(this.force.newtons.quantity * time.seconds.quantity);
// 	}

// 	voltage(current: Current): Voltage {
// 		return Voltage.inVolts(this.watts.quantity / current.amps.quantity);
// 	}

// 	time(energy: Energy): Time {
// 		return seconds(energy.joules.quantity / this.watts.quantity);
// 	}
// }
