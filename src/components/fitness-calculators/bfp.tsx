import React, { useState } from "react";
import { distanceOf } from "../../physics/distance";
import DistanceInput from "../physics/distance-input";

const BfpCalculator = () => {
	const [sex, setSex] = useState("male");

	const defaults = {
		abCircumference: distanceOf(35).in,
		neckCircumference: distanceOf(16).in,
		height: distanceOf(72).in,
		waistCircumference: distanceOf(30).in,
		hipCircumference: distanceOf(31).in
	};

	const [abCircumference, setAbCircumference] = useState(
		defaults.abCircumference
	);

	const [neckCircumference, setNeckCircumference] = useState(
		defaults.neckCircumference
	);

	const [height, setHeight] = useState(defaults.height);

	const [waistCircumference, setWaistCircumference] = useState(
		defaults.waistCircumference
	);

	const [hipCircumference, setHipCircumference] = useState(
		defaults.hipCircumference
	);

	return (
		<div style={{ border: "solid", width: "100%", padding: "2em" }}>
			<div>
				<label htmlFor="sex">Biological sex:</label>&nbsp;
				<div>
					<select
						name="dropdown"
						id="sex"
						value={sex}
						onChange={(e) => setSex(e.target.value)}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
			</div>
			{sex === "male" && (
				<div>
					<label>Abdomen circumference:</label>&nbsp;
					<DistanceInput
						distance={defaults.abCircumference.value}
						unit={defaults.abCircumference.unit.symbol}
						onChange={setAbCircumference}
					/>
				</div>
			)}
			<div>
				<label>Neck circumference:</label>&nbsp;
				<DistanceInput
					distance={defaults.neckCircumference.value}
					unit={defaults.neckCircumference.unit.symbol}
					onChange={setNeckCircumference}
				/>
			</div>
			{sex === "female" && (
				<div>
					<label>Waist circumference:</label>&nbsp;
					<DistanceInput
						distance={defaults.waistCircumference.value}
						unit={defaults.waistCircumference.unit.symbol}
						onChange={setWaistCircumference}
					/>
				</div>
			)}
			{sex === "female" && (
				<div>
					<label>Hip circumference:</label>&nbsp;
					<DistanceInput
						distance={defaults.hipCircumference.value}
						unit={defaults.hipCircumference.unit.symbol}
						onChange={setHipCircumference}
					/>
				</div>
			)}
			<div>
				<label>Height:</label>
				<DistanceInput
					distance={defaults.height.value}
					unit={defaults.height.unit.symbol}
					onChange={setHeight}
				/>
			</div>
			<h3>Output</h3>
			<table>
				<tr>
					<td>Sex</td>
					<td>{sex}</td>
				</tr>
				{sex === "male" && (
					<tr>
						<td>Abdomen circumference</td>
						<td>
							{abCircumference.value} {abCircumference.unit.symbol} (
							{abCircumference.inCentimeters().value.toFixed(2)}{" "}
							{abCircumference.inCentimeters().unit.symbol})
						</td>
					</tr>
				)}
				<tr>
					<td>Neck circumference</td>
					<td>
						{neckCircumference.value} {neckCircumference.unit.symbol} (
						{neckCircumference.inCentimeters().value.toFixed(2)}{" "}
						{neckCircumference.inCentimeters().unit.symbol})
					</td>
				</tr>
				{sex === "female" && (
					<tr>
						<td>Waist circumference</td>
						<td>
							{waistCircumference.value} {waistCircumference.unit.symbol} (
							{waistCircumference.inCentimeters().value.toFixed(2)}{" "}
							{waistCircumference.inCentimeters().unit.symbol})
						</td>
					</tr>
				)}
				{sex === "female" && (
					<tr>
						<td>Hip circumference</td>
						<td>
							{hipCircumference.value} {hipCircumference.unit.symbol} (
							{hipCircumference.inCentimeters().value.toFixed(2)}{" "}
							{hipCircumference.inCentimeters().unit.symbol})
						</td>
					</tr>
				)}
				<tr>
					<td>Height</td>
					<td>
						{height.value} {height.unit.symbol} (
						{height.inCentimeters().value.toFixed(2)}{" "}
						{height.inCentimeters().unit.symbol})
					</td>
				</tr>
				<tr>
					<td>Body fat percentage</td>
					<td>
						{sex === "male" && (
							<span>
								{(
									86.01 *
										Math.log10(
											abCircumference.inCentimeters().value -
												neckCircumference.inCentimeters().value
										) -
									70.041 * Math.log10(height.inCentimeters().value) +
									36.76
								).toFixed(2)}
								%
							</span>
						)}
						{sex === "female" && (
							<span>
								{(
									163.205 *
										Math.log10(
											waistCircumference.inCentimeters().value +
												hipCircumference.inCentimeters().value -
												neckCircumference.inCentimeters().value
										) -
									97.684 * Math.log10(height.inCentimeters().value) -
									104.912
								).toFixed(2)}
								%
							</span>
						)}
					</td>
				</tr>
			</table>
		</div>
	);
};

export default BfpCalculator;
