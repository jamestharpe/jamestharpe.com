import { Unit } from "./measures";

export const metersPerSecondSquared: Unit<"meters/second²", "m/s²"> = {
	name: "meters/second²",
	symbol: "m/s²"
};

export type MetersPerSecondSquared = typeof metersPerSecondSquared;

// export default class Acceleration implements Metric<MetersPerSecondSquared> {
// 	public static symbol = "A";

// 	constructor({ distance, time }: VelocityUnits) {
// 		this.value = new Measurement(
// 			distance.meters.quantity / time.seconds.quantity ** 2,
// 			metersPerSecondSquared
// 		);
// 	}

// 	static inMetersPerSecondSquared(meters: number) {
// 		return new Acceleration({
// 			distance: Distance.inMeters(meters),
// 			time: Time.inSeconds(1)
// 		});
// 	}

// 	readonly value: Measurement;

// 	get metersPerSecondSquared(): Measurement {
// 		return this.value;
// 	}

// 	time(distance: Distance): Time {
// 		return seconds(
// 			distance.meters.quantity / Math.sqrt(this.metersPerSecondSquared.quantity)
// 		);
// 	}

// 	distance(time: Time): Distance {
// 		return Distance.inMeters(
// 			this.metersPerSecondSquared.quantity * time.seconds.quantity ** 2
// 		);
// 	}
// }
