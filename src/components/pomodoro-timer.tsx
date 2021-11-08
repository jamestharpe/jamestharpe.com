/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMachine } from "@xstate/react";
import React from "react";
import {
	AnyEventObject,
	assign,
	Machine,
	MachineConfig,
	StateSchema
} from "xstate";

const context = {
	iterations: 0,
	elapsed: 0,
	remaining: 0,
	started: Date.now(),
	paused: Date.now(),
	target: {
		working: 1500000, // 25 minutes
		resting: 300000 // 5 m inutes
	}
};

const config: MachineConfig<
	typeof context,
	StateSchema<any>,
	AnyEventObject
> = {
	id: "pomodoro",
	initial: "idle",
	context,
	states: {
		idle: {
			on: {
				NEXT: "running"
			}
		},
		running: {
			initial: "iterating",
			on: {
				END: "idle"
			},
			states: {
				iterating: {
					exit: ["start", "iterate"],
					on: {
						"": "working"
					}
				},
				working: {
					entry: ["tick"],
					on: {
						PAUSE: "#pomodoro.paused",
						SKIP: "worked",
						"": { target: "worked", cond: "complete" }
					},
					after: {
						1000: [{ target: "working", cond: "incomplete" }]
					}
				},
				worked: {
					on: {
						NEXT: "resting",
						REPEAT: "iterating"
					},
					exit: "start"
				},
				resting: {
					entry: "tick",
					on: {
						PAUSE: "#pomodoro.paused",
						SKIP: "rested",
						"": { target: "rested", cond: "complete" }
					},
					after: {
						1000: [{ target: "resting", cond: "incomplete" }]
					}
				},
				rested: {
					on: {
						NEXT: "iterating",
						REPEAT: "resting"
					},
					exit: "start"
				},
				last: {
					type: "history"
				}
			}
		},
		paused: {
			entry: "pause",
			on: {
				RESUME: "running.last",
				END: "idle"
			},
			exit: "resume"
		}
	}
};

let lastTarget = 0;

function target(state: any, context: any) {
	return (lastTarget = (
		state.matches("running.working")
			? context.target.working
			: state.matches("running.resting")
			? context.target.resting
			: lastTarget
	) as number);
}

const pomodoroMachine = Machine(config, {
	guards: {
		complete: (context, _, { state }) =>
			context.elapsed >= target(state, context),
		incomplete: (context, _, { state }) =>
			context.elapsed < target(state, context),
		firstIteration: (context) => context.iterations === 0
	},
	actions: {
		tick: assign({
			elapsed: (context) => Date.now() - context.started,
			remaining: (context, _, { state }) =>
				target(state, context) - context.elapsed
		}),
		start: assign({ started: () => Date.now() }),
		pause: assign({ paused: () => Date.now() }),
		resume: assign({
			started: (context) => context.started + (Date.now() - context.paused)
		}),
		iterate: assign({
			iterations: (context) => {
				return context.iterations + 1;
			}
		})
	}
});

function msToTime(duration: number) {
	const seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	const h = hours < 10 ? "0" + hours.toString() : hours.toString();
	const m = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
	const s = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
	console.log("msToTime", duration);
	return h + ":" + m + ":" + s;
}

const PomodoroTimer = () => {
	const [state, send] = useMachine(pomodoroMachine);
	const caption = state.matches("idle")
		? "Inactive"
		: state.matches("running.working")
		? "You Should Be Working"
		: state.matches("running.worked")
		? "Work Session Complete"
		: state.matches("running.resting")
		? "You Should Be Resting"
		: state.matches("running.rested")
		? "Rest Session Complete"
		: state.matches("paused")
		? "Paused"
		: "...";

	return (
		<div>
			<h3>{caption}</h3>
			{!state.matches("idle") && <h4>{msToTime(state.context.remaining)}</h4>}
			{state.nextEvents.includes("NEXT") && (
				<button onClick={() => send("NEXT")} title="Start Session">
					▶
				</button>
			)}

			{state.nextEvents.includes("PAUSE") && (
				<button onClick={() => send("PAUSE")} title="Pause">
					⏸
				</button>
			)}
			{state.nextEvents.includes("RESUME") && (
				<button onClick={() => send("RESUME")} title="Pause">
					▶
				</button>
			)}
			{state.nextEvents.includes("SKIP") && (
				<button onClick={() => send("SKIP")} title="Skip Session">
					⏭
				</button>
			)}
			{state.nextEvents.includes("REPEAT") && (
				<button onClick={() => send("REPEAT")} title="Repeat Session">
					🔁
				</button>
			)}
		</div>
	);
};

export default PomodoroTimer;
