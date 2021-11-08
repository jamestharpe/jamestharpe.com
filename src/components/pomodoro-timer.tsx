/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMachine } from "@xstate/react";
import React from "react";
import { assign, createMachine } from "xstate";

const context = {
	iterations: 0,
	elapsed: 0,
	remaining: 0,
	started: Date.now(),
	paused: Date.now(),
	target: {
		working: 1500000, // 25 minutes
		resting: 300000 // 5 m minutes
	}
};

let lastTarget = context.target.working;

function target(state: any, ctx: typeof context) {
	return (lastTarget = state.matches("running.working")
		? ctx.target.working
		: state.matches("running.resting")
		? ctx.target.resting
		: lastTarget);
}

const pomodoroMachine = createMachine(
	{
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
						entry: "start",
						exit: "iterate",
						always: "working"
					},
					working: {
						entry: ["tick"],
						always: { target: "worked", cond: "complete" },
						on: {
							PAUSE: "#pomodoro.paused",
							SKIP: "worked"
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
						always: { target: "rested", cond: "complete" },
						on: {
							PAUSE: "#pomodoro.paused",
							SKIP: "rested"
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
	},
	{
		guards: {
			complete: (context, _, { state }) =>
				context.elapsed >= target(state, context),
			incomplete: (context, _, { state }) =>
				context.elapsed < target(state, context)
			// firstIteration: (context) => context.iterations === 0
		},
		actions: {
			tick: assign((context, _event, { state }) => {
				const elapsed = Date.now() - context.started;
				const remaining = target(state, context) - elapsed;
				console.log("tick", { elapsed, remaining, context });
				return {
					...context,
					elapsed,
					remaining
				};
			}),
			start: assign((context, _event, { state }) => ({
				...context,
				started: Date.now(),
				remaining: target(state, context)
			})),
			pause: assign((context) => ({ ...context, paused: Date.now() })),
			resume: assign({
				started: (context) => context.started + (Date.now() - context.paused)
			}),
			iterate: assign({
				iterations: (context) => {
					return context.iterations + 1;
				}
			})
		}
	}
);

function msToTime(duration: number) {
	const seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	const h = hours < 10 ? `0${hours}` : `${hours}`;
	const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
	console.log("msToTime", duration);
	return `${h}:${m}:${s}`;
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
