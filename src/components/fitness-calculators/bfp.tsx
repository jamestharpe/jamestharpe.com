import React, { useState } from "react";
import { distanceOf } from "../../physics/distance";
import DistanceInput from "../physics/distance-input";

type BfpCalculatorProps = {
	style?: React.CSSProperties;
};

const BfpCalculator: React.FC<BfpCalculatorProps> = ({ style }) => {
	const [sex, setSex] = useState("male");
	const [abCircumference, setAbCircumference] = useState(distanceOf(35).in);
	const [neckCircumference, setNeckCircumference] = useState(distanceOf(16).in);
	const [height, setHeight] = useState(distanceOf(72).in);
	const [waistCircumference, setWaistCircumference] = useState(
		distanceOf(30).in
	);
	const [hipCircumference, setHipCircumference] = useState(distanceOf(31).in);

	return (
		<div style={style}>
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
						distance={abCircumference.value}
						unit={abCircumference.unit.symbol}
						onChange={setAbCircumference}
					/>
				</div>
			)}
			<div>
				<label>Neck circumference:</label>&nbsp;
				<DistanceInput
					distance={neckCircumference.value}
					unit={neckCircumference.unit.symbol}
					onChange={setNeckCircumference}
				/>
			</div>
			{sex === "female" && (
				<div>
					<label>Waist circumference:</label>&nbsp;
					<DistanceInput
						distance={waistCircumference.value}
						unit={waistCircumference.unit.symbol}
						onChange={setWaistCircumference}
					/>
				</div>
			)}
			{sex === "female" && (
				<div>
					<label>Hip circumference:</label>&nbsp;
					<DistanceInput
						distance={hipCircumference.value}
						unit={hipCircumference.unit.symbol}
						onChange={setHipCircumference}
					/>
				</div>
			)}
			<div>
				<label>Height:</label>
				<DistanceInput
					distance={height.value}
					unit={height.unit.symbol}
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
							{abCircumference
								.inCentimeters()
								.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
							{abCircumference.inCentimeters().unit.symbol})
						</td>
					</tr>
				)}
				<tr>
					<td>Neck circumference</td>
					<td>
						{neckCircumference.value} {neckCircumference.unit.symbol} (
						{neckCircumference
							.inCentimeters()
							.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
						{neckCircumference.inCentimeters().unit.symbol})
					</td>
				</tr>
				{sex === "female" && (
					<tr>
						<td>Waist circumference</td>
						<td>
							{waistCircumference.value} {waistCircumference.unit.symbol} (
							{waistCircumference
								.inCentimeters()
								.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
							{waistCircumference.inCentimeters().unit.symbol})
						</td>
					</tr>
				)}
				{sex === "female" && (
					<tr>
						<td>Hip circumference</td>
						<td>
							{hipCircumference.value} {hipCircumference.unit.symbol} (
							{hipCircumference
								.inCentimeters()
								.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
							{hipCircumference.inCentimeters().unit.symbol})
						</td>
					</tr>
				)}
				<tr>
					<td>Height</td>
					<td>
						{height.value} {height.unit.symbol} (
						{height
							.inCentimeters()
							.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
						{height.inCentimeters().unit.symbol})
					</td>
				</tr>
				<tr>
					<td>Body fat percentage (BFP)</td>
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
								).toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
								).toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
