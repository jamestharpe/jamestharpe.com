import React, { useState } from "react";
import { massOf } from "../../physics/mass";
import MassInput from "../physics/mass-input";

type FfmCalculatorProps = {
	style?: React.CSSProperties;
};

const FfmCalculator: React.FC<FfmCalculatorProps> = ({ style }) => {
	const [bfp, setBfp] = useState(25.0);
	const [weight, setWeight] = useState(massOf(150).lbs);

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
						min="0"
						max="100"
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
					<td>BFP</td>
					<td>{bfp}%</td>
				</tr>
				<tr>
					<td>Fat mass</td>
					<td>
						{(weight.value * (bfp / 100)).toLocaleString(undefined, {
							maximumFractionDigits: 2
						})}{" "}
						{weight.unit.symbol}
					</td>
				</tr>
				<tr>
					<td>Fat free mass (FFM)</td>
					<td>
						{(weight.value - weight.value * (bfp / 100)).toLocaleString(undefined, {
							maximumFractionDigits: 2
						})}{" "}
						{weight.unit.symbol}
					</td>
				</tr>
			</table>
		</div>
	);
};

export default FfmCalculator;
