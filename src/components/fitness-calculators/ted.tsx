import React, { useState } from "react";

type TedCalculatorProps = {
	style?: React.CSSProperties;
};

const TedCalculator: React.FC<TedCalculatorProps> = ({ style }) => {
	const [nee, setNee] = useState(2500);
	const [erat, setErat] = useState(400);

	return (
		<div style={style}>
			<div>
				<label>Non-workout energy expidenture:</label>&nbsp;
				<div>
					<input
						type="number"
						min="0"
						value={nee}
						onChange={(e) => setNee(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<div>
				<label>Exercise related activity thermogenesis:</label>&nbsp;
				<div>
					<input
						type="number"
						min="0"
						value={erat}
						onChange={(e) => setErat(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<h3>Output</h3>
			<table>
				<tr>
					<td>NEE</td>
					<td>{nee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
				</tr>
				<tr>
					<td>ERAT</td>
					<td>{erat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
				</tr>
				<tr>
					<td>Total Energy Demand (TED)</td>
					<td>
						{(nee + erat).toLocaleString(undefined, { maximumFractionDigits: 0 })}
					</td>
				</tr>
			</table>
		</div>
	);
};

export default TedCalculator;
