import pluralize from "pluralize";
import React, { useState } from "react";
import {
	centimeter,
	DistanceMeasurement,
	distanceOf,
	DistanceUnit,
	DistanceUnitSymbol,
	inch
} from "../../physics/distance";

type DistanceInputProps = {
	distance?: number;
	unit?: DistanceUnitSymbol;
	onChange: (distance: DistanceMeasurement) => void;
};

const distanceUnits: Array<DistanceUnit> = [centimeter, inch];

const DistanceInput: React.FC<DistanceInputProps> = ({
	distance: distanceValue,
	unit,
	onChange
}) => {
	const [distance, setDistance] = useState(
		distanceOf(distanceValue || 0)[unit || "cm"]
	);

	const doSetDistance = (d: DistanceMeasurement) => {
		setDistance(d);
		onChange(d);
		console.log("DistanceInput.distance", d);
	};

	return (
		<div>
			<input
				type="number"
				value={distance.value || "0"}
				onChange={(e) =>
					doSetDistance(distanceOf(parseFloat(e.target.value))[distance.unit.symbol])
				}
			/>
			<select
				name="dropdown"
				id="dropdown"
				value={distance.unit.symbol}
				onChange={(e) =>
					doSetDistance(
						distanceOf(distance.value)[e.target.value as DistanceUnitSymbol]
					)
				}
			>
				{distanceUnits.map((unit) => (
					<option value={unit.symbol} key={unit.symbol}>
						{pluralize(unit.name)} ({unit.symbol})
					</option>
				))}
			</select>
		</div>
	);
};

export default DistanceInput;
