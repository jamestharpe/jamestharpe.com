import pluralize from "pluralize";
import Distance, { meter } from "./distance";
import Measurement, { Metric, Unit } from "./measures";
import Time, { second, seconds } from "./time";
import { VelocityUnits } from "./velocity";

export const metersPerSecondSquared: Unit = {
	name: `${pluralize(meter.name)}/${second.name}²`,
	symbol: `${meter.symbol}/${second.symbol}²`
};

export default class Acceleration implements Metric {
	public static symbol = "A";

	constructor({ distance, time }: VelocityUnits) {
		this.value = new Measurement(
			distance.meters.quantity / time.seconds.quantity ** 2,
			metersPerSecondSquared
		);
	}

	static inMetersPerSecondSquared(meters: number) {
		return new Acceleration({
			distance: Distance.inMeters(meters),
			time: Time.inSeconds(1)
		});
	}

	readonly value: Measurement;

	get metersPerSecondSquared(): Measurement {
		return this.value;
	}

	time(distance: Distance): Time {
		return seconds(
			distance.meters.quantity / Math.sqrt(this.metersPerSecondSquared.quantity)
		);
	}

	distance(time: Time): Distance {
		return Distance.inMeters(
			this.metersPerSecondSquared.quantity * time.seconds.quantity ** 2
		);
	}
}
