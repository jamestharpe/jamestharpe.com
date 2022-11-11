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
	/** @xstate-layout N4IgpgJg5mDOIC5QAcD2BbVFUCdUDoBLCAGzAGIA5AUQA0AVAbQAYBdRFVWQgF0NQB2HEAA9EARgAsk-MzlyAbOIWSATMwCsygDQgAnogUBOGQHZJRgBwbVJ5kfOWAvk91pM2PPhwBXAQMIBKCIeMBwAQz4g8hZ2JBA0bj5BYTEESQBmVVkM8VUMiyzVSQ0NXQMEBXt8cyMjTUtmEo0M51cEjCxcAl9-QOCAd1wAa37yAAUAQQBVAGVqWOFE3n4heLTxU3N8fLUjDVMMoxVTVXLEEst8OrrG0slLUzyXN07PHr8AoPwhnFHo2YAaQAkuNFvFlsk1qA0qYVLJJApLNYFBpGgoFOdKttilYMrk1MiHC8Oh5ut5Pv0fiMxuDOElVqlEHCZE0kSi0cwMViFKorrijAS4RlTCT3F0vL0voMadERLAeJEwPhwgAzUI4AAU4nkAEpyOL3hS+t9fv8oHSOgyUutEDYNNdVOJLNIiryHliNNIahYTAo4ZZ-UoxW9yVKqWbIFQ6Ew2EsuCsbTCJFyjPg8lp7FlmKdVKYeSV8L7BRkNKjmPlVCGyZLKaaRlGAErUcbUSaxuL0xPQ0TMuo1Sx5cyZOG2IxY-GmIs3QOcjTHNqvGsfE3BHBwKJQCYzeaWyGM20ITY4gq2A5HE5nfR2nXXG5IjTMAriOoaasSlfS7wbsZA0F7hMoSZI9JCkdMywyVFTHsSRTGOHknhqG5NCUTJNCMd8jXDb51wVWk4whQCD2TECwPECCoJguDMWvBBTDRO86l5CtNh1DJMLDOs1x-OUFSVFV1TCbU9QNUNa1Xb88KCADrR7DZlAUHJxBFfEh0DSRPUaac6nMGwjCkL0OPEr9cNCCBowYGTu2AqQMWuLlIIOJ1TjyLFGhkGcFEg5FVDHIzPypUymxbNsO3jWSbOkNNLHqejpBipp8R5F8kLqTYMQOA5xH841pXIahKAAESsoDD3I1l5C5ZQ1E0HRaPUGRHzkExnS5TLF1JD98GQcIfFgYLZmmABZBYCK7UqSOKZh7PdMtAxij1aP2RTfWsOFeUfNQcp6vqowK4qxqtayyq9WRKqUFR1C0GiKksDIzuYHUKwcu7fJcdoBCwOB42XIhSDAcLjpItQsUFfAmvsJ5BRsJ8MPaQ1OIk3gwkifpAYm3sEDzB16lmpEkRMSxPVOH06iaeadWKHLsJlP40cIiLDyc2RoIyOQ7oDaweUe0nBVgzZfIeamuOpP5IHR4jMf0q5WakY5eRFcjuauYssl5NbNmFiTTPp8bJY2J1sk2BxGiJSmeRFbTjmKLZjC2+GxICnCN3Fhmgcx8jkXwQdVBaZ1IL5QMsUOcRtNnO5Tzhpcupp-ASHCBUJaTTG+Wm3HijmgnFoqaCp1qBaCdKI4telJO5MQXyp3Tkp8YWon6oecH5EsQ2jHUdXtt6-qIDLmyFsYl0ChFB4g9ozIPJuUxAzkMsLH83vDwAWhuxBl-epwgA */
	return createMachine(
		{
			context: context,
			tsTypes: {} as import("./pomodoro-timer.typegen").Typegen0,
			schema: { context: {} as PomodoroContext, events: {} as PomodoroEvents },
			id: "pomodoro",
			initial: "idle",
			states: {
				idle: {
					on: {
						NEXT: {
							target: "running"
						}
					}
				},
				running: {
					initial: "iterating",
					states: {
						iterating: {
							entry: "start",
							exit: "iterate",
							always: {
								target: "working"
							}
						},
						working: {
							entry: "tick",
							after: {
								"1000": {
									target: "#pomodoro.running.working",
									cond: "incomplete",
									actions: [],
									internal: false
								}
							},
							always: {
								target: "worked",
								cond: "complete"
							},
							on: {
								PAUSE: {
									target: "#pomodoro.paused"
								},
								SKIP: {
									target: "worked"
								}
							}
						},
						worked: {
							entry: "stop",
							exit: "start",
							on: {
								NEXT: {
									target: "resting"
								},
								REPEAT: {
									target: "iterating"
								}
							}
						},
						resting: {
							entry: "tick",
							after: {
								"1000": {
									target: "#pomodoro.running.resting",
									cond: "incomplete",
									actions: [],
									internal: false
								}
							},
							always: {
								target: "rested",
								cond: "complete"
							},
							on: {
								PAUSE: {
									target: "#pomodoro.paused"
								},
								SKIP: {
									target: "rested"
								}
							}
						},
						rested: {
							entry: "stop",
							exit: "start",
							on: {
								NEXT: {
									target: "iterating"
								},
								REPEAT: {
									target: "resting"
								}
							}
						},
						last: {
							history: false,
							type: "history"
						}
					},
					on: {
						END: {
							target: "idle"
						}
					}
				},
				paused: {
					entry: "pause",
					exit: "resume",
					on: {
						RESUME: {
							target: "#pomodoro.running.last"
						},
						END: {
							target: "idle"
						}
					}
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
