import pluralize from "pluralize";
import React, { useState } from "react";
import { massOf } from "../../physics/mass";
import { timeOf } from "../../physics/time";
import DurationInput from "../physics/duration-input";
import MassInput from "../physics/mass-input";

type EratCalculatorProps = {
	style?: React.CSSProperties;
};

const EratCalculator: React.FC<EratCalculatorProps> = ({ style }) => {
	const [weight, setWeight] = useState(massOf(150.0).lbs);
	const [time, setTime] = useState(timeOf(60).m);
	const [met, setMet] = useState(6);

	return (
		<div style={style}>
			<div>
				<label>Weight:</label>&nbsp;
				<MassInput
					mass={weight.value}
					unit={weight.unit.symbol}
					min={0}
					onChange={setWeight}
				/>
			</div>
			<div>
				<label>Exercise duration:</label>&nbsp;
				<div>
					<DurationInput
						duration={time.value}
						unit={time.unit.symbol}
						min={0}
						onChange={(duration) => setTime(duration)}
					/>
					minutes
				</div>
			</div>
			<div>
				<label>MET:</label>&nbsp;
				<div>
					<input
						type="number"
						min="1"
						max="18"
						value={met}
						onChange={(e) => setMet(parseFloat(e.target.value))}
					/>
				</div>
			</div>
			<h3>Output</h3>
			<table>
				<tr>
					<td>Weight</td>
					<td>
						{weight.value} {weight.unit.symbol} (
						{weight
							.inKilograms()
							.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
						{weight.inKilograms().unit.symbol})
					</td>
				</tr>
				<tr>
					<td>Exercise duration</td>
					<td>
						{time.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
						{time.unit.name} (
						{time
							.inHours()
							.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
						{pluralize(time.inHours().unit.name)})
					</td>
				</tr>
				<tr>
					<td>MET</td>
					<td>{met}</td>
				</tr>
				<tr>
					<td>Exercise Related Activity Thermogenesis (ERAT)</td>
					<td>
						{(weight.inKilograms().value * time.inHours().value * met).toLocaleString(
							undefined,
							{ maximumFractionDigits: 0 }
						)}{" "}
						Calories
					</td>
				</tr>
			</table>
		</div>
	);
};

export default EratCalculator;
