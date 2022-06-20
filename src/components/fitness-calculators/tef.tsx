import React, { useState } from "react";

type TefCalculatorProps = {
	style?: React.CSSProperties;
};

const TefCalculator: React.FC<TefCalculatorProps> = ({ style }) => {
	const [rmr, setRmr] = useState(1940);

	return (
		<div style={style}>
			<div>
				<label>Resting metabolic rate:</label>&nbsp;
				<div>
					<input
						type="number"
						value={rmr}
						onChange={(e) => setRmr(parseFloat(e.target.value))}
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
					<td>Thermic Effect of Food (TEF)</td>
					<td>
						From {(rmr * 0.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
						to {(rmr * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
						Calories
					</td>
				</tr>
			</table>
		</div>
	);
};

export default TefCalculator;
