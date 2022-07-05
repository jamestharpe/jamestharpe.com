/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMachine } from "@xstate/react";
import React from "react";
import { assign, createMachine, State } from "xstate";

interface PomodoroContext {
	iterations: number;
	elapsed: number;
	remaining: number;
	started?: Date;
	paused?: Date;
	target: {
		current?: number;
		working: number;
		resting: number;
	};
}

type PomodoroEvents =
	| { type: "NEXT" }
	| { type: "END" }
	| { type: "PAUSE" }
	| { type: "SKIP" }
	| { type: "REPEAT" }
	| { type: "RESUME" };

const defaultPomodoroContext: PomodoroContext = {
	iterations: 0,
	elapsed: 0,
	remaining: 1500000,
	target: {
		working: 1500000, // 25 minutes
		resting: 300000 // 5 m minutes
	}
};

function target(
	state?: State<PomodoroContext, PomodoroEvents>,
	context: PomodoroContext = defaultPomodoroContext
): number {
	const result =
		state?.matches("running.worked") || state?.matches("running.resting")
			? context.target.resting
			: context?.target.working;

	return result;
}

function nextTarget(
	state?: State<PomodoroContext, PomodoroEvents>,
	context: PomodoroContext = defaultPomodoroContext
): number {
	const result =
		target(state, context) === context.target.resting
			? context.target.working
			: context.target.resting;

	return result;
}

function createPomodoro(initialContext?: Partial<PomodoroContext>) {
	const context: PomodoroContext = {
		...defaultPomodoroContext,
		...initialContext
	};
	return createMachine(
		{
			id: "pomodoro",
			tsTypes: {} as import("./pomodoro-timer.typegen").Typegen0,
			schema: {
				context: {} as PomodoroContext,
				events: {} as PomodoroEvents
			},
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
							entry: "tick",
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
							entry: "stop",
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
							entry: "stop",
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
				complete: (context, _event, { state }) =>
					context.elapsed >=
					target(
						state as unknown as State<PomodoroContext, PomodoroEvents>, // XState typegen workaround :(
						context
					), // target(state, context),
				incomplete: (context, _event, { state }) =>
					context.elapsed <
					target(state as unknown as State<PomodoroContext, PomodoroEvents>, context) // XState typegen workaround :(
				// firstIteration: (context) => context.iterations === 0
			},
			actions: {
				tick: assign((context, _event, { state }) => {
					const elapsed = Date.now() - (context.started?.getTime() || 0);
					const remaining =
						(context.target.current ||
							target(
								state as unknown as State<PomodoroContext, PomodoroEvents>, // XState typegen workaround :(
								context
							)) - elapsed;
					return {
						...context,
						elapsed,
						remaining
					};
				}),
				start: assign((context, _event, { state }) => {
					const remaining = target(
						state as unknown as State<PomodoroContext, PomodoroEvents>, // XState typegen workaround :(
						context
					);
					return {
						...context,
						started: new Date(),
						remaining,
						target: { ...context.target, current: remaining }
					};
				}),
				stop: assign((context, _event, { state }) => {
					return {
						...context,
						elapsed: 0,
						remaining: nextTarget(
							state as unknown as State<PomodoroContext, PomodoroEvents>, // XState typegen workaround :(
							context
						)
					};
				}),
				pause: assign((context) => ({ ...context, paused: new Date() })),
				resume: assign({
					started: (context) => {
						const now = Date.now();
						const started = context.started?.getTime() ?? now;
						const paused = context.paused?.getTime() ?? now;
						return new Date(started + (now - paused));
					}
				}),
				iterate: assign({
					iterations: (context) => {
						return context.iterations + 1;
					}
				})
			}
		}
	);
}

const pomodoroMachine = createPomodoro({});

function msToTime(duration: number) {
	const seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	const h = hours < 10 ? `0${hours}` : `${hours}`;
	const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const s = seconds < 10 ? `0${seconds}` : `${seconds}`;

	return `${h}:${m}:${s}`;
}

const captionMap: Record<string, string> = {
	idle: "Inactive",
	"running.working": "You Should Be Working",
	"running.worked": "Work Session Complete",
	"running.resting": "You Should Be Resting",
	"running.rested": "Rest Session Complete",
	paused: "Paused"
};

const PomodoroTimer = () => {
	const [state, send] = useMachine(pomodoroMachine);
	const caption = captionMap[state.toStrings().pop() || ""];

	return (
		<div>
			<h3>{caption}</h3>
			<h4>{msToTime(state.context.remaining)}</h4>
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
				<button onClick={() => send("RESUME")} title="Resume">
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
