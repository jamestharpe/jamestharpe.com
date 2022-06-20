import pluralize from "pluralize";
import React, { useState } from "react";
import {
	hour,
	minute,
	second,
	TimeMeasurement,
	timeOf,
	TimeUnit,
	TimeUnitSymbol
} from "../../physics/time";

type DurationInputProps = {
	duration?: number;
	unit?: TimeUnitSymbol;
	min?: number;
	max?: number;
	onChange: (mass: TimeMeasurement) => void;
};

const timeUnits: Array<TimeUnit> = [hour, minute, second];

const DurationInput: React.FC<DurationInputProps> = ({
	duration: durationValue,
	unit,
	min,
	max,
	onChange
}) => {
	const [duration, setDuration] = useState(
		timeOf(durationValue || 0)[unit || "m"]
	);

	const doSetDuration = (d: TimeMeasurement) => {
		setDuration(d);
		onChange(d);
	};

	return (
		<div>
			<input
				type="number"
				min={min}
				max={max}
				value={duration.value || "0"}
				onChange={(e) =>
					doSetDuration(timeOf(parseFloat(e.target.value))[duration.unit.symbol])
				}
			/>
			<select
				name="dropdown"
				id="dropdown"
				value={duration.unit.symbol}
				onChange={(e) =>
					doSetDuration(timeOf(duration.value)[e.target.value as TimeUnitSymbol])
				}
			>
				{timeUnits.map((unit) => (
					<option value={unit.symbol} key={unit.symbol}>
						{pluralize(unit.name)} ({unit.symbol})
					</option>
				))}
			</select>
		</div>
	);
};

export default DurationInput;
