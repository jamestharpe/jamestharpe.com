import React from "react";

// const context = {
// 	iterations: 0,
// 	elapsed: 0,
// 	started: Date.now(),
// 	paused: Date.now(),
// 	target: {
// 		working: 10000,
// 		resting: 5000
// 	}
// };

// const config: MachineConfig<
// 	typeof context,
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	StateSchema<any>,
// 	AnyEventObject
// > = {
// 	id: "pomodoro",
// 	initial: "idle",
// 	context,
// 	states: {
// 		idle: {
// 			on: {
// 				NEXT: "running"
// 			}
// 		},
// 		running: {
// 			initial: "iterating",
// 			on: {
// 				END: "idle"
// 			},
// 			states: {
// 				iterating: {
// 					exit: ["start", "iterate"],
// 					on: {
// 						"": "working"
// 					}
// 				},
// 				working: {
// 					entry: ["tick"],
// 					on: {
// 						PAUSE: "#pomodoro.paused",
// 						SKIP: "worked",
// 						"": { target: "worked", cond: "complete" }
// 					},
// 					after: {
// 						1000: [{ target: "working", cond: "incomplete" }]
// 					}
// 				},
// 				worked: {
// 					on: {
// 						NEXT: "resting",
// 						REPEAT: "iterating"
// 					},
// 					exit: "start"
// 				},
// 				resting: {
// 					entry: "tick",
// 					on: {
// 						PAUSE: "#pomodoro.paused",
// 						SKIP: "rested",
// 						"": { target: "rested", cond: "complete" }
// 					},
// 					after: {
// 						1000: [{ target: "resting", cond: "incomplete" }]
// 					}
// 				},
// 				rested: {
// 					on: {
// 						NEXT: "iterating",
// 						REPEAT: "resting"
// 					},
// 					exit: "start"
// 				},
// 				last: {
// 					type: "history"
// 				}
// 			}
// 		},
// 		paused: {
// 			entry: "pause",
// 			on: {
// 				RESUME: "running.last",
// 				END: "idle"
// 			},
// 			exit: "resume"
// 		}
// 	}
// };

// const pomodoroMachine = Machine(config, {
// 	guards: {
// 		complete: (context, _, { state }) => {
// 			const target = state?.matches("running.working")
// 				? context.target.working
// 				: context.target.resting;
// 			return context.elapsed >= target;
// 		},
// 		incomplete: (context, _, { state }) => {
// 			const target = state?.matches("running.working")
// 				? context.target.working
// 				: context.target.resting;
// 			return context.elapsed < target;
// 		},
// 		firstIteration: (context) => context.iterations === 0
// 	},
// 	actions: {
// 		tick: assign({
// 			elapsed: (context) => Date.now() - context.started
// 		}),
// 		start: assign({ started: () => Date.now() }),
// 		pause: assign({ paused: () => Date.now() }),
// 		resume: assign({
// 			started: (context) => context.started + (Date.now() - context.paused)
// 		}),
// 		iterate: assign({
// 			iterations: (context) => {
// 				return context.iterations + 1;
// 			}
// 		})
// 	}
// });

const PomodoroTimer = () => {
	return <label>Timer?</label>;
};

export default PomodoroTimer;
