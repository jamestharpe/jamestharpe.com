import React, { useState } from "react";

type NeatCalculatorProps = {
	style?: React.CSSProperties;
};

const NeatCalculator: React.FC<NeatCalculatorProps> = ({ style }) => {
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
			<h4>NEAT Estimates</h4>
			<table>
				<thead>
					<tr>
						<th>Activity level</th>
						<th style={{ width: "8em" }}>NEAT Estimate</th>
					</tr>
				</thead>
				<tr>
					<td>Extremely low (bed-ridden or chair-ridden)</td>
					<td>
						{(rmr * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })} to{" "}
						{(rmr * 0.3).toLocaleString(undefined, { maximumFractionDigits: 0 })}
					</td>
				</tr>
				<tr>
					<td>Sedentary (minimal movement at work and home)</td>
					<td>
						{(rmr * 0.4).toLocaleString(undefined, { maximumFractionDigits: 0 })} to{" "}
						{(rmr * 0.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
					</td>
				</tr>
				<tr>
					<td>
						Minimally active (minimal non-strenuous movement at work and/or home)
					</td>
					<td>
						{(rmr * 0.6).toLocaleString(undefined, { maximumFractionDigits: 0 })} to{" "}
						{(rmr * 0.7).toLocaleString(undefined, { maximumFractionDigits: 0 })}
					</td>
				</tr>
				<tr>
					<td>
						Moderately active (some strenuous movement, such as prolonged standing, at
						work and/or home)
					</td>
					<td>
						{(rmr * 0.8).toLocaleString(undefined, { maximumFractionDigits: 0 })} to{" "}
						{(rmr * 0.9).toLocaleString(undefined, { maximumFractionDigits: 0 })}
					</td>
				</tr>
				<tr>
					<td>
						Very active (strenuous movement throughout most of the day, such as
						housework, yard work, or construction)
					</td>
					<td>
						{(rmr * 1.0).toLocaleString(undefined, { maximumFractionDigits: 0 })} to{" "}
						{(rmr * 1.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}
					</td>
				</tr>
			</table>
		</div>
	);
};

export default NeatCalculator;
