import { assign, createMachine } from "xstate";
import Time from "../time";
import Task from "./task";

export default function createTaskMachine(task: Task) {
	/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHsAHMQiAYkzNQoBswAXMRUCs2XN3GXxcQAD0QBaAMwBOABwkA7ADYAjAFZlAJlUAGVXN2KZ6gDQgAnolVSALCVXLdd7erlzlMxQF9v5tFh4hKSU1JD06PiYYMwiPHwCQiLiCNLySmqaOvqGxmaWiFpy9jIyUoq6WlpSylKytb7+GDgExORUNLRwAhgccbz8gsJIYpLK6va2ilq2MrZSbnbO5lYIeqoks+XOnuq6s2WNIAEtwe1hdBQAToI3AgBenCPxg0kjKRLKKiRaMlqKHmUs1mujkK2skzKFV0anmMmUciOJyCbQYTFYHDooWG3AGiRxo1S1RkJDk9Qm8PUJjUUnBCA8DicNSkqkUbLJaiRzRRpEwkWirCxHX6CSGyUkihI8NsajJdSpCKkWjp0ikJDq8LqtnmB3U6l8fhA+DIEDgImRrRCHUgIteBI+iimpL1WgRpTk6jydNUZU2UJhbM9zhhXMClpIaJY7BtzzxYveklUtgUtXGRST2mmAO9er92z0+yMxVDp1R-JiMdxoreoBSZJ+UmKjbschMVRk3qTeYRPakRY8JZ5tvx4tSbI2HvUrtb8k9JhVenU6vqfcM+z7-wN3iAA */
	return createMachine(
		{
			tsTypes: {} as import("./task-machine.typegen").Typegen0,
			schema: {
				context: {} as Task,
				events: {} as
					| { type: "open" }
					| { type: "complete" }
					| { type: "cancel" }
					| { type: "estimate"; value: number }
					| { type: "prioritize"; higherPriorityTaskId: number | null }
			},
			id: "(machine)",
			initial: "opened",
			states: {
				opened: {
					entry: ["setCanceledToUndefined", "setCompletedToUndefined"],
					on: {
						complete: {
							actions: ["setCompletedToCurrentTime", "setCanceledToNull"],
							target: "completed"
						},
						cancel: {
							target: "canceled"
						},
						estimate: {
							actions: "setEstimate"
						},
						prioritize: {
							actions: "setHigherPriorityId"
						}
					}
				},
				completed: {
					on: {
						open: {
							target: "opened"
						}
					}
				},
				canceled: {
					entry: ["setCanceledToCurrentTime", "setCompletedToNull"],
					on: {
						open: {
							target: "opened"
						}
					}
				}
			}
		},
		{
			actions: {
				setCanceledToCurrentTime: assign({
					canceled: (context, event) => Time.current()
				}),
				setCanceledToNull: assign({
					canceled: (context, event) => null
				}),
				setCompletedToCurrentTime: assign({
					completed: (context, event) => Time.current()
				}),
				setCompletedToNull: assign({
					completed: (context, event) => null
				}),
				setEstimate: assign({
					estimate: (context, event) => event.value
				}),
				setHigherPriorityId: assign({
					higherPriorityId: (context, event) => event.higherPriorityTaskId as number
				})
			}
		}
	);
}
