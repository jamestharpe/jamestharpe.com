import { DistanceUnit } from "./distance";
import { Unit } from "./measures";
import { TimeUnit } from "./time";

export type VelocityUnits = { distance: DistanceUnit; time: TimeUnit };

export const metersPerSecond: Unit<"meters per second", "m/s"> = {
	name: "meters per second",
	symbol: "m/s"
};

export type MetersPerSecond = typeof metersPerSecond;

// export default class Velocity implements Metric<MetersPerSecond> {
// 	public static symbol = "V";

// 	constructor({ distance, time }: VelocityUnits) {
// 		this.value = new Measurement(
// 			distance.meters.quantity / time.seconds.quantity,
// 			metersPerSecond
// 		);
// 	}

// 	static inMetersPerSecond(meters: number) {
// 		return new Velocity({
// 			distance: Distance.inMeters(meters),
// 			time: Time.inSeconds(1)
// 		});
// 	}

// 	readonly value: Measurement;

// 	get metersPerSecond(): Measurement {
// 		return this.value;
// 	}

// 	time(distance: Distance): Time {
// 		return seconds(distance.meters.quantity / this.metersPerSecond.quantity);
// 	}

// 	distance(time: Time): Distance {
// 		return Distance.inMeters(
// 			this.metersPerSecond.quantity * time.seconds.quantity
// 		);
// 	}
// }
