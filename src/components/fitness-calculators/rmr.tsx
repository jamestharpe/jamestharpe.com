import React, { useState } from "react";
import { massOf } from "../../physics/mass";
import MassInput from "../physics/mass-input";

type RmrCalculatorProps = {
	style?: React.CSSProperties;
};

const RmrCalculator: React.FC<RmrCalculatorProps> = ({ style }) => {
	const [bfp, setBfp] = useState(23.12);
	const [weight, setWeight] = useState(massOf(185).lbs);

	return (
		<div style={style}>
			<div>
				<label>Weight:</label>&nbsp;
				<MassInput
					mass={weight.value}
					unit={weight.unit.symbol}
					onChange={setWeight}
				/>
			</div>
			<div>
				<label>Body Fat Percentage:</label>&nbsp;
				<div>
					<input
						type="number"
						value={bfp}
						onChange={(e) => setBfp(parseFloat(e.target.value))}
					/>
					%
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
					<td>Resting Metabolic Rate (RMR)</td>
					<td>
						{(weight.inKilograms().value * bfp).toLocaleString(undefined, {
							maximumFractionDigits: 0
						})}{" "}
						Calories
					</td>
				</tr>
			</table>
		</div>
	);
};

export default RmrCalculator;
