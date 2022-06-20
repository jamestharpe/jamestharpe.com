import React, { useState } from "react";

type NeeCalculatorProps = {
	style?: React.CSSProperties;
};

const NeeCalculator: React.FC<NeeCalculatorProps> = ({ style }) => {
	const [rmr, setRmr] = useState(1500);
	const [tef, setTef] = useState(200);
	const [neat, setNeat] = useState(800);

	return (
		<div style={style}>
			<div>
				<label>Resting metabolic rate (RMR):</label>&nbsp;
				<div>
					<input
						type="number"
						value={rmr}
						onChange={(e) => setRmr(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<div>
				<label>Thermic effect of food (TEF):</label>&nbsp;
				<div>
					<input
						type="number"
						value={tef}
						onChange={(e) => setTef(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<div>
				<label>Non-exercise activity thermogenesis (NEAT):</label>&nbsp;
				<div>
					<input
						type="number"
						value={neat}
						onChange={(e) => setNeat(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<h3>Output</h3>
			<table>
				<tr>
					<td>RMR</td>
					<td>
						{rmr.toLocaleString(undefined, { maximumFractionDigits: 0 })} Calories
					</td>
				</tr>
				<tr>
					<td>TEF</td>
					<td>
						{tef.toLocaleString(undefined, { maximumFractionDigits: 0 })} Calories
					</td>
				</tr>
				<tr>
					<td>NEAT</td>
					<td>
						{neat.toLocaleString(undefined, { maximumFractionDigits: 0 })} Calories
					</td>
				</tr>
				<tr>
					<td>Non-workout energy expenditure (NEE)</td>
					<td>
						{(rmr + tef + neat).toLocaleString(undefined, {
							maximumFractionDigits: 0
						})}{" "}
						calories
					</td>
				</tr>
			</table>
		</div>
	);
};

export default NeeCalculator;
