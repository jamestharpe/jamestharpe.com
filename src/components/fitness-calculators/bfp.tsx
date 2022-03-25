/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMachine } from "@xstate/react";
import React from "react";
import { assign, createMachine } from "xstate";

const formatAsPercent = (n = 0) =>
	new Intl.NumberFormat("default", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	}).format(n);

interface BfpContext {
	leanMass?: number;
	fatMass?: number;
	totalMass?: number;
	bodyFatPercentage?: number;
	leanMassPercentage?: number;
}

const defaultBfpContext: BfpContext = {};

interface BfpEvent {
	type: "SET_FAT_MASS" | "SET_TOTAL_MASS";
	input: string;
}

function createBfpCalculator(initialContext?: Partial<BfpContext>) {
	const context: BfpContext = {
		...defaultBfpContext,
		...initialContext
	};
	return createMachine<BfpContext, BfpEvent>(
		{
			id: "Body Fat Percentage Calculator",
			initial: "inputs",
			context,
			states: {
				inputs: {
					type: "parallel",
					states: {
						"fat-mass": {
							initial: "needed",
							states: {
								needed: {
									always: [{ target: "set", cond: "hasFatMass" }]
								},
								set: {
									entry: "calculate",
									type: "final"
								}
							}
						},
						"total-mass": {
							initial: "needed",
							states: {
								needed: {
									always: [{ target: "set", cond: "hasTotalMass" }]
								},
								set: {
									entry: "calculate",
									type: "final"
								}
							}
						}
					},
					onDone: {
						target: "calculated"
					}
				},
				calculated: {}
			},
			on: {
				SET_FAT_MASS: {
					actions: "assignFatMass",
					target: ".inputs.fat-mass.needed"
				},
				SET_TOTAL_MASS: {
					actions: "assignTotalMass",
					target: ".inputs.total-mass.needed"
				}
			}
		},
		{
			guards: {
				hasFatMass: (context) => !!context.fatMass,
				hasTotalMass: (context) => !!context.totalMass
			},
			actions: {
				calculate: assign((context) => {
					console.log("Calculating", context);
					const { fatMass, totalMass } = context;
					const leanMass = fatMass && totalMass && totalMass - fatMass;
					const bodyFatPercentage = fatMass && totalMass && fatMass / totalMass;
					const leanMassPercentage = leanMass && totalMass && leanMass / totalMass;

					return {
						fatMass,
						totalMass,
						leanMass,
						bodyFatPercentage,
						leanMassPercentage
					};
				}),
				assignFatMass: assign((_context, { input }) => {
					return {
						fatMass: parseFloat(input) || context.fatMass
					};
				}),
				assignTotalMass: assign((_context, { input }) => {
					return { totalMass: parseFloat(input) || context.totalMass };
				})
			}
		}
	);
}

const bfpMachine = createBfpCalculator({});

const BfpCalculator = () => {
	const [state, send] = useMachine(bfpMachine);
	return (
		<div>
			<h3>Fat mass:</h3>
			<input
				type="text"
				style={{ width: "50%" }}
				value={state.context.fatMass || ""}
				onChange={(e) => send({ type: "SET_FAT_MASS", input: e.target.value })}
			/>
			<h3>Total mass:</h3>
			<input
				type="text"
				style={{ width: "50%" }}
				value={state.context.totalMass || ""}
				onChange={(e) => send({ type: "SET_TOTAL_MASS", input: e.target.value })}
			/>
			{state.matches("calculated") && (
				<div>
					<h3>Results:</h3>
					<table>
						<tbody>
							<tr>
								<td>Body fat percentage:</td>
								<td>{formatAsPercent(state.context.bodyFatPercentage || 0)}</td>
							</tr>
							<tr>
								<td>Lean mass:</td>
								<td>{state.context.leanMass || 0}</td>
							</tr>
							<tr>
								<td>Lean mass percentage:</td>
								<td>{formatAsPercent(state.context.leanMassPercentage || 0)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default BfpCalculator;
