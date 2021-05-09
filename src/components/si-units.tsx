const kilo = (quantity: number) => quantity / 10 ** 3;
const centi = (quantity: number) => quantity / 10 ** -2;
const milli = (quantity: number) => quantity / 10 ** -3;

class Distance {
	public static symbol = "d";

	constructor(public meters: number) {
		this.centimeters = centi(meters);
	}

	readonly centimeters: number;
}

const meters = (quantity: number) => new Distance(quantity);

class Time {
	public static symbol = "t";

	constructor(public seconds: number) {
		this.milliseconds = milli(seconds);
	}

	public readonly milliseconds: number;
}

const seconds = (quantity: number) => new Time(quantity);

class Mass {
	public static symbol = "M";

	constructor(public grams: number) {
		this.kilograms = kilo(grams);
	}

	public readonly kilograms: number;
}

// const grams = (quantity: number) => new Mass(quantity);
const kilograms = (quantity: number) => new Mass(kilo(quantity));

type VelocityUnits = { distance: Distance; time: Time };

class Velocity {
	public static symbol = "V";

	constructor({ distance, time }: VelocityUnits) {
		this.metersPerSecond = distance.meters / time.seconds;
	}

	public readonly metersPerSecond: number;

	time(distance: Distance): Time {
		return seconds(distance.meters / this.metersPerSecond);
	}

	distance(time: Time): Distance {
		return meters(this.metersPerSecond * time.seconds);
	}
}

const metersPerSecond = (quantity: number) =>
	new Velocity({ distance: meters(quantity), time: seconds(1) });

class Acceleration {
	public static symbol = "A";

	constructor({ distance, time }: VelocityUnits) {
		this.metersPerSecondSquared = distance.meters / time.seconds ** 2;
	}

	public metersPerSecondSquared: number;

	time(distance: Distance): Time {
		return seconds(distance.meters / Math.sqrt(this.metersPerSecondSquared));
	}

	distance(time: Time): Distance {
		return meters(this.metersPerSecondSquared * time.seconds ** 2);
	}
}

const metersPerSecondSquared = (quantity: number) =>
	new Acceleration({ distance: meters(quantity), time: seconds(1) });

type ForceUnits = { mass: Mass; acceleration: Acceleration };

/**
 * F = MA. The amount of Energy transferred to an object that will change the motion of that object if
 * unopposed by another Force. Measured in newtons.
 *
 * @class Force
 */
class Force {
	public static symbol = "F";

	constructor({ mass, acceleration }: ForceUnits) {
		this.newtons = mass.kilograms * acceleration.metersPerSecondSquared;
	}

	public readonly newtons: number;

	mass(acceleration: Acceleration): Mass {
		return kilograms(this.newtons / acceleration.metersPerSecondSquared);
	}

	acceleration(mass: Mass): Acceleration {
		return metersPerSecondSquared(this.newtons / mass.kilograms);
	}
}

const newtons = (quantity: number) =>
	new Force({
		mass: kilograms(quantity),
		acceleration: metersPerSecondSquared(1)
	});

type EnergyUnits = { force: Force; distance: Distance };

/**
 * E = Fd. The ability to do work. Measured in joules.
 *
 * @class Energy
 */
class Energy {
	public static symbol = "E";

	constructor({ force, distance }: EnergyUnits) {
		this.joules = force.newtons * distance.meters;
	}

	readonly joules: number;

	force(distance: Distance): Force {
		return newtons(this.joules / distance.meters);
	}

	distance(force: Force): Distance {
		return meters(this.joules / force.newtons);
	}
}

const joules = (quantity: number) =>
	new Energy({ force: newtons(quantity), distance: meters(1) });

/**
 * P = FV, P = J/s. The rate at which energy is transferred over time.
 *
 * @class Power
 */
class Power {
	static symbol = "P";

	constructor(force: Force, velocity: Velocity) {
		this.watts = force.newtons * velocity.metersPerSecond;
		// this.energy = new Energy(force, );
	}

	readonly watts: number;

	current(voltage: Voltage): Current {
		return amps(this.watts / voltage.volts);
	}

	energy(time: Time): Energy {
		return joules(this.watts * time.seconds);
	}

	force(velocity: Velocity): Force {
		return newtons(this.watts / velocity.metersPerSecond);
	}

	velocity(force: Force): Velocity {
		return metersPerSecond(this.watts / force.newtons);
	}

	voltage(current: Current): Voltage {
		return volts(this.watts / current.amps);
	}

	time(energy: Energy): Time {
		return seconds(energy.joules / this.watts);
	}
}

function watts(currentAndVoltage: CurrentAndVoltage): Power;
function watts(quantity: number): Power;
function watts(quantity: number | CurrentAndVoltage): Power {
	quantity =
		typeof quantity === "number"
			? quantity
			: quantity.current.amps * quantity.voltage.volts;
	return new Power(newtons(quantity), metersPerSecond(1));
}

class Current {
	public static symbol = "I";

	constructor(coulombs: number, time: Time) {
		this.amps = coulombs / time.seconds;
	}

	readonly amps: number;

	coulombs(time: Time): number {
		return this.amps * time.seconds;
	}

	power(voltage: Voltage): Power {
		return watts(this.amps * voltage.volts);
	}

	resistance(voltage: Voltage): Resistance {
		return ohms(voltage.volts / this.amps);
	}

	time(coulombs: number) {
		return coulombs / this.amps;
	}

	voltage(resistance: Resistance): Voltage {
		return volts({ current: this, resistance });
	}
}

type ResistanceAndVoltage = { resistance: Resistance; voltage: Voltage };

function amps(resistanceAndVoltage: ResistanceAndVoltage): Current;
function amps(quantity: number): Current;
function amps(quantity: number | ResistanceAndVoltage) {
	quantity =
		typeof quantity === "number"
			? quantity
			: quantity.voltage.volts / quantity.resistance.ohms;
	return new Current(quantity, seconds(1));
}

class Voltage {
	public static symbol = "V";

	constructor(energy: Energy, coulombs: number) {
		this.volts = energy.joules / coulombs;
	}

	readonly volts: number;

	energy(coulombs: number): Energy {
		return joules(this.volts * coulombs);
	}

	coulombs(energy: Energy): number {
		return energy.joules / this.volts;
	}

	current(resistance: Resistance): Current {
		return amps({ voltage: this, resistance });
	}

	power(current: Current): Power {
		return watts({ current, voltage: this });
	}

	resistance(current: Current): Resistance {
		return ohms(this.volts / current.amps);
	}
}

type CurrentAndVoltage = { current: Current; voltage: Voltage };

function volts(currentAndResistance: CurrentAndResistance): Voltage;
function volts(quantity: number): Voltage;
function volts(quantity: number | CurrentAndResistance): Voltage {
	quantity =
		typeof quantity === "number"
			? quantity
			: quantity.current.amps * quantity.resistance.ohms;

	return new Voltage(joules(quantity), 1);
}

class Resistance {
	public static symbol = "R";

	constructor(current: Current, voltage: Voltage) {
		this.ohms = voltage.volts / current.amps;
	}

	readonly ohms: number;

	current(voltage: Voltage): Current {
		return amps(voltage.volts / this.ohms);
	}

	voltage(current: Current): Voltage {
		return volts(current.amps * this.ohms);
	}
}

type CurrentAndResistance = { current: Current; resistance: Resistance };

function ohms(currentAndVoltage: CurrentAndVoltage): Resistance;
function ohms(quantity: number): Resistance;
function ohms(quantity: number | CurrentAndVoltage) {
	quantity =
		typeof quantity === "number"
			? quantity
			: quantity.voltage.volts / quantity.current.amps;
	return new Resistance(amps(1), volts(quantity));
}
