import Current from "./current";
import Resistance from "./resistance";
import Voltage from "./voltage";

export type ResistanceAndVoltage = { resistance: Resistance; voltage: Voltage };
export type CurrentAndVoltage = { current: Current; voltage: Voltage };
export type CurrentAndResistance = { current: Current; resistance: Resistance };
