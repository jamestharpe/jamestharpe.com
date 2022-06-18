import React, { useState } from "react";
import { massOf } from "../../physics/mass";
import MassInput from "../physics/mass-input";

const RmrCalculator = () => {
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
					<td>RMR</td>
					<td>{(weight.inKilograms().value * bfp).toFixed()} calories</td>
				</tr>
			</table>
		</div>
	);
};

export default RmrCalculator;
