import React, { useState } from "react";
import { massOf } from "../../physics/mass";
import MassInput from "../physics/mass-input";

const FfmCalculator = () => {
	const [bfp, setBfp] = useState(23.12);
	const [weight, setWeight] = useState(massOf(185).lbs);

	return (
		<div style={{ border: "solid", width: "100%", padding: "2em" }}>
			<div>
				<label>Weight:</label>&nbsp;
				<MassInput
					mass={weight.value}
					unit={weight.unit.symbol}
					onChange={setWeight}
				/>
			</div>
			<div>
				<label>BFP:</label>&nbsp;
				<div>
					<input
						type="text"
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
						{weight.inKilograms().value.toFixed(2)} {weight.inKilograms().unit.symbol}
						)
					</td>
				</tr>
				<tr>
					<td>BFP</td>
					<td>{bfp}%</td>
				</tr>
				<tr>
					<td>Fat mass</td>
					<td>
						{(weight.value * (bfp / 100)).toFixed(2)} {weight.unit.symbol}
					</td>
				</tr>
				<tr>
					<td>Fat free mass</td>
					<td>
						{(weight.value - weight.value * (bfp / 100)).toFixed(2)}{" "}
						{weight.unit.symbol}
					</td>
				</tr>
			</table>
		</div>
	);
};

export default FfmCalculator;
