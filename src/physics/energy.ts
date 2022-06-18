// import Distance from "./distance";
// import Force from "./force";
// import Measurement, { Metric, Unit } from "./measures";

// export type EnergyUnits = { force: Force; distance: Distance };

// export const joule: Unit = {
// 	name: "joules",
// 	symbol: "J"
// };

// /**
//  * E = Fd. The ability to do work. Measured in joules.
//  *
//  * @class Energy
//  */
// export default class Energy implements Metric {
// 	public static symbol = "E";

// 	constructor({ force, distance }: EnergyUnits) {
// 		this.value = new Measurement(
// 			force.newtons.quantity * distance.meters.quantity,
// 			joule
// 		);
// 	}

// 	static inJoules(newtons: number): Energy;
// 	static inJoules(force: Force): Energy;
// 	static inJoules(quantity: Force | number): Energy {
// 		quantity =
// 			typeof quantity === "number" ? quantity : quantity.newtons.quantity;
// 		return new Energy({
// 			force: Force.inNewtons(quantity),
// 			distance: Distance.inMeters(1)
// 		});
// 	}

// 	readonly value: Measurement;

// 	get joules(): Measurement {
// 		return this.value;
// 	}

// 	force(distance: Distance): Force {
// 		return Force.inNewtons(this.joules.quantity / distance.meters.quantity);
// 	}

// 	distance(force: Force): Distance {
// 		return Distance.inMeters(this.joules.quantity / force.newtons.quantity);
// 	}
// }
