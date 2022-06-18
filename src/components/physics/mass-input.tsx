import pluralize from "pluralize";
import React, { useState } from "react";
import {
	kilogram,
	MassMeasurement,
	massOf,
	MassUnit,
	MassUnitSymbol,
	pound
} from "../../physics/mass";

type MassInputProps = {
	mass?: number;
	unit?: MassUnitSymbol;
	onChange: (mass: MassMeasurement) => void;
};

const massUnits: Array<MassUnit> = [pound, kilogram];

const MassInput: React.FC<MassInputProps> = ({
	mass: massValue,
	unit,
	onChange
}) => {
	const [mass, setMass] = useState(massOf(massValue || 0)[unit || "kg"]);

	const doSetMass = (m: MassMeasurement) => {
		setMass(m);
		onChange(m);
	};

	return (
		<div>
			<input
				type="text"
				value={mass.value || "0"}
				onChange={(e) =>
					doSetMass(massOf(parseFloat(e.target.value))[mass.unit.symbol])
				}
			/>
			<select
				name="dropdown"
				id="dropdown"
				value={mass.unit.symbol}
				onChange={(e) =>
					doSetMass(massOf(mass.value)[e.target.value as MassUnitSymbol])
				}
			>
				{massUnits.map((unit) => (
					<option value={unit.symbol} key={unit.symbol}>
						{pluralize(unit.name)} ({unit.symbol})
					</option>
				))}
			</select>
		</div>
	);
};

export default MassInput;
