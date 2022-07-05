/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMachine } from "@xstate/react";
import React from "react";
import { assign, createMachine } from "xstate";

interface CoderFuncs {
	encode: (s: string) => string;
	decode: (s: string) => string;
}

const coders: Record<string, CoderFuncs> = {
	base64: {
		encode: (s = "") => window.btoa(s),
		decode: (s = "") => {
			try {
				return window.atob(s);
			} catch (e) {
				console.log("Decode error: ", e);
				return "(not a valid base64 string)";
			}
		}
	},
	base64url: {
		encode: (s = "") =>
			coders.base64.encode(s).replace(/\+/g, "-").replace(/\//g, "_"),
		decode: (s = "") =>
			coders.base64.decode(s.replace(/-/g, "+").replace(/_/g, "/"))
	}
};

function createCoderMachine(coderType: string) {
	const { encode, decode } = coders[coderType.toLowerCase()];
	return createMachine(
		{
			tsTypes: {} as import("./coder.typegen").Typegen0,
			schema: {
				context: {} as {
					input: string;
					encoded?: string;
					decoded?: string;
				},
				events: {} as { type: "INPUT"; input: string }
			},
			id: "base64Coder",
			initial: "ready",
			context: { input: "" },
			on: {
				INPUT: {
					actions: ["assignInput", "encode", "decode"]
				}
			},
			states: {
				ready: {}
			}
		},
		{
			actions: {
				assignInput: assign({
					input: (_, { input }) => input || ""
				}),
				encode: assign({
					encoded: (context, { input }) => encode(input || context.input)
				}),
				decode: assign({
					decoded: (context, { input }) => decode(input || context.input)
				})
			}
		}
	);
}

type CoderProps = {
	type: string;
};

const Coder: React.FC<CoderProps> = ({ type }) => {
	const [state, send] = useMachine(createCoderMachine(type));

	return (
		<div>
			<h3>Input:</h3>
			<input
				type="text"
				style={{ width: "100%" }}
				value={state.context.input}
				onChange={(e) => send({ type: "INPUT", input: e.target.value })}
			/>
			<span>
				<h3>Encoded:</h3>
				<textarea
					readOnly={true}
					style={{ width: "100%" }}
					value={state.context.encoded}
				/>
			</span>
			<span>
				<h3>Decoded:</h3>
				<textarea
					readOnly={true}
					style={{ width: "100%" }}
					value={state.context.decoded}
				/>
			</span>
		</div>
	);
};

export default Coder;
