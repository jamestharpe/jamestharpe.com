import Acceleration from "./acceleration";
import Mass from "./mass";
import Measurement, { Metric, Unit } from "./measures";

export type ForceUnits = { mass: Mass; acceleration: Acceleration };

const newton: Unit = {
	name: "newton",
	symbol: "N"
};

/**
 * F = MA. The amount of Energy transferred to an object that will change the motion of that object if
 * unopposed by another Force. Measured in newtons.
 *
 * @class Force
 */
export default class Force implements Metric {
	public static symbol = "F";

	constructor(public readonly massAndAcceleration: ForceUnits) {
		const { mass, acceleration } = massAndAcceleration;
		this.value = new Measurement(
			mass.kilograms.quantity * acceleration.metersPerSecondSquared.quantity,
			newton
		);
	}

	static inNewtons(kilograms: number) {
		return new Force({
			mass: Mass.inKilograms(kilograms),
			acceleration: Acceleration.inMetersPerSecondSquared(1)
		});
	}

	readonly value: Measurement;

	get newtons(): Measurement {
		return new Measurement(this.value.quantity, newton);
	}
}
