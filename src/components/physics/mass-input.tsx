/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMachine } from "@xstate/react";
import pluralize from "pluralize";
import React from "react";
import { assign, createMachine } from "xstate";
import { MassUnit, UnitOfMass } from "../../physics/mass";

interface MassContext {
	mass?: number;
	massUnit: UnitOfMass;
}

const defaultMassContext: MassContext = {
	massUnit: "pound"
};

type AssignMassEvent = {
	type: "ASSIGN_MASS";
	value?: number;
};

type AssignMassUnitEvent = {
	type: "ASSIGN_MASS_UNIT";
	value: UnitOfMass;
};

type MassInputEvent = AssignMassEvent | AssignMassUnitEvent;

function createMassInput(initialContext?: Partial<MassContext>) {
	const context: MassContext = {
		...defaultMassContext,
		...initialContext
	};
	return createMachine<MassContext, MassInputEvent>(
		{
			id: "mass-input",
			initial: "not-set",
			context,
			states: {
				set: {
					always: [{ target: "not-set", cond: "massIsNotSet" }]
				},
				"not-set": {
					always: [{ target: "set", cond: "massIsSet" }]
				}
			},
			on: {
				ASSIGN_MASS: {
					actions: "assignMass"
				},
				ASSIGN_MASS_UNIT: {
					actions: "assignMassUnit"
				}
			}
		},
		{
			guards: {
				massIsNotSet: (context) => !context.mass,
				massIsSet: (context) => !!context.mass
			},
			actions: {
				assignMass: assign((_context, { value }) => ({
					mass: value as number
				})),
				assignMassUnit: assign((_context, { value }) => ({
					massUnit: ((value as string) || context.mass) as UnitOfMass
				}))
			}
		}
	);
}

const massMachine = createMassInput({});

type MassInputProps = {
	label: string;
};

const MassInput: React.FC<MassInputProps> = ({ label }) => {
	const [state, send] = useMachine(massMachine);
	return (
		<div>
			<h3>{label}</h3>
			<input
				type="text"
				style={{ width: "50%" }}
				value={state.context.mass || ""}
				onChange={(e) =>
					send({ type: "ASSIGN_MASS", value: parseFloat(e.target.value) })
				}
			/>
			<select
				name="dropdown"
				id="dropdown"
				value={state.context.massUnit}
				onChange={(e) =>
					send({ type: "ASSIGN_MASS_UNIT", value: e.target.value as UnitOfMass })
				}
			>
				{Object.keys(MassUnit).map((unit) => (
					<option value={unit} key={unit}>
						{pluralize(MassUnit[unit as UnitOfMass].name)}(
						{MassUnit[unit as UnitOfMass].symbol})
					</option>
				))}
			</select>
		</div>
	);
};

export default MassInput;
