// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2019  James Tharpe

export default interface Identifiable {
	readonly id: number; // TODO: or string
}

export interface IdGenerator {
	(): number;
}

export function isIdentifiable(candidate: unknown) {
	const result = Object.prototype.hasOwnProperty.call(candidate, "id");
	return result;
}
