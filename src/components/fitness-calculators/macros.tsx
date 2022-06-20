import React, { useState } from "react";
import { massOf } from "../../physics/mass";
import MassInput from "../physics/mass-input";

type MacrosCalculatorProps = {
	style?: React.CSSProperties;
};

const MacrosCalculator: React.FC<MacrosCalculatorProps> = ({ style }) => {
	const [weight, setWeight] = useState(massOf(150.0).lbs);
	const [bfp, setBfp] = useState(25.0);
	const [nee, setNeat] = useState(2500);
	const [ted, setTed] = useState(2900);

	const fatMass = weight.inPounds().value * (bfp / 100);
	const ffm = weight.inPounds().value - fatMass;

	const proteinGramsTargetA = weight.inPounds().value;
	const proteinGramsTargetB = ffm * 1.6;
	const proteinCaloriesTargetA = proteinGramsTargetA * 4;
	const proteinCaloriesTargetB = proteinGramsTargetB * 4;
	const nonProteinCaloriesWorkoutTargetA = ted - proteinCaloriesTargetA;
	const nonProteinCaloriesWorkoutTargetB = ted - proteinCaloriesTargetB;
	const nonProteinCaloriesNonWorkoutTargetA = nee - proteinCaloriesTargetA;
	const nonProteinCaloriesNonWorkoutTargetB = nee - proteinCaloriesTargetB;

	const weightFormattedLbs = weight.inPounds().value.toLocaleString(undefined, {
		maximumFractionDigits: 2
	});
	const weightFormattedKg = weight
		.inKilograms()
		.value.toLocaleString(undefined, {
			maximumFractionDigits: 2
		});

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
			<div>
				<label>Non-workout energy expenditure (NEE):</label>&nbsp;
				<div>
					<input
						type="number"
						value={nee}
						onChange={(e) => setNeat(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<div>
				<label>Total Energy Demand (TED):</label>&nbsp;
				<div>
					<input
						type="number"
						value={ted}
						onChange={(e) => setTed(parseFloat(e.target.value))}
					/>{" "}
					Calories
				</div>
			</div>
			<h3>Output</h3>
			<table>
				<tr>
					<td>Weight</td>
					<td>
						{weightFormattedLbs}lbs ({weightFormattedKg}kg)
					</td>
				</tr>
				<tr>
					<td>BFP</td>
					<td>{bfp}%</td>
				</tr>
				<tr>
					<td>NEE</td>
					<td>
						{nee.toLocaleString(undefined, { maximumFractionDigits: 0 })} Calories
					</td>
				</tr>
				<tr>
					<td>TED</td>
					<td>
						{ted.toLocaleString(undefined, { maximumFractionDigits: 0 })} Calories
					</td>
				</tr>
				<tr>
					<td>Protein</td>
					<td>
						{proteinGramsTargetA.toLocaleString(undefined, {
							maximumFractionDigits: 0
						})}
						{" to "}
						{proteinGramsTargetB.toLocaleString(undefined, {
							maximumFractionDigits: 0
						})}{" "}
						grams per day (about{" "}
						{proteinCaloriesTargetA.toLocaleString(undefined, {
							maximumFractionDigits: 0
						})}{" "}
						to{" "}
						{proteinCaloriesTargetB.toLocaleString(undefined, {
							maximumFractionDigits: 0
						})}{" "}
						Calories)
					</td>
				</tr>
				<tr>
					<td>Fats and Carbs</td>
					<td>
						<ul>
							<li>
								{nonProteinCaloriesWorkoutTargetA.toLocaleString(undefined, {
									maximumFractionDigits: 0
								})}{" "}
								to{" "}
								{nonProteinCaloriesWorkoutTargetB.toLocaleString(undefined, {
									maximumFractionDigits: 0
								})}{" "}
								Calories on <strong>workout days</strong>
							</li>
							<li>
								{nonProteinCaloriesNonWorkoutTargetA.toLocaleString(undefined, {
									maximumFractionDigits: 0
								})}{" "}
								to{" "}
								{nonProteinCaloriesNonWorkoutTargetB.toLocaleString(undefined, {
									maximumFractionDigits: 0
								})}{" "}
								Calories on <strong>non-workout days</strong>
							</li>
						</ul>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default MacrosCalculator;
