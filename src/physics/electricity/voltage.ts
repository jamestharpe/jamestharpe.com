// import { CurrentAndResistance } from ".";
// import Energy from "../energy";
// import Measurement, { Metric, Unit } from "../measures";
// import Power from "../power";
// import Current from "./current";
// import Resistance, { ohms } from "./resistance";

// export const volt: Unit = {
// 	name: "volt",
// 	symbol: "V"
// };

// /**
//  * V=C/J, V=W/A. Stored electrical energy. Measured in volts.
//  *
//  * @export
//  * @class Voltage
//  * @implements {Metric}
//  */
// export default class Voltage implements Metric {
// 	public static symbol = "V";

// 	constructor(energy: Energy, coulombs: number) {
// 		this.value = new Measurement(energy.joules.quantity / coulombs, volt);
// 	}

// 	static inVolts(currentAndResistance: CurrentAndResistance): Voltage;
// 	static inVolts(volts: number): Voltage;
// 	static inVolts(quantity: number | CurrentAndResistance): Voltage {
// 		quantity =
// 			typeof quantity === "number"
// 				? quantity
// 				: quantity.current.amps.quantity * quantity.resistance.ohms.quantity;

// 		return new Voltage(Energy.inJoules(quantity), 1);
// 	}

// 	readonly value: Measurement;

// 	get volts() {
// 		return this.value;
// 	}

// 	energy(coulombs: number): Energy {
// 		return Energy.inJoules(this.volts.quantity * coulombs);
// 	}

// 	coulombs(energy: Energy): number {
// 		return energy.joules.quantity / this.volts.quantity;
// 	}

// 	current(resistance: Resistance): Current {
// 		return Current.inAmps({ voltage: this, resistance });
// 	}

// 	power(current: Current): Power {
// 		return Power.inWatts({ current, voltage: this });
// 	}

// 	resistance(current: Current): Resistance {
// 		return ohms(this.volts.quantity / current.amps.quantity);
// 	}
// }
