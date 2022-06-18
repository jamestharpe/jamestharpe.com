// import { CurrentAndVoltage } from ".";
// import Measurement, { Metric, Unit } from "../measures";
// import Current from "./current";
// import Voltage from "./voltage";

// export const ohm: Unit = {
// 	name: "ohm",
// 	symbol: "Ω"
// };

// /**
//  * R = V / I. Opposition to current. Measured in ohms.
//  *
//  * @export
//  * @class Resistance
//  * @implements {Metric}
//  */
// export default class Resistance implements Metric {
// 	public static symbol = "R";

// 	constructor(current: Current, voltage: Voltage) {
// 		this.value = new Measurement(
// 			voltage.volts.quantity / current.amps.quantity,
// 			ohm
// 		);
// 	}

// 	public readonly value: Measurement;

// 	get ohms(): Measurement {
// 		return this.value;
// 	}

// 	current(voltage: Voltage): Current {
// 		return Current.inAmps(voltage.volts.quantity / this.ohms.quantity);
// 	}

// 	voltage(current: Current): Voltage {
// 		return Voltage.inVolts(current.amps.quantity * this.ohms.quantity);
// 	}
// }

// export function ohms(currentAndVoltage: CurrentAndVoltage): Resistance;
// export function ohms(quantity: number): Resistance;
// export function ohms(quantity: number | CurrentAndVoltage) {
// 	quantity =
// 		typeof quantity === "number"
// 			? quantity
// 			: quantity.voltage.volts.quantity / quantity.current.amps.quantity;
// 	return new Resistance(Current.inAmps(1), Voltage.inVolts(quantity));
// }
