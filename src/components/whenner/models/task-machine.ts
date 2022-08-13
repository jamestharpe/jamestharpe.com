import { assign, createMachine } from "xstate";
import Time from "../time";
import Task, { taskFrom } from "./task";

export default function createTaskMachine(task: Task | undefined) {
	/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBsB7dCAqAYkVAAcLZcAXXC-RkAD0QBaACwBOAEwkADAFYpANlEBGAOwBmCcOEqANCACeicfMnCAHMLVL5SqcLkqAvo71oseQqQpMwhCHUwKVCYyMHYwXhY2Tm5eAQQlWxI1KTN5FTMVLVkzGSU9QwQ1MyVk1XkU2xk1GQlnVwwcAmISb19IAPR8TDAySNYOLh4kfkREqWTU9MzsmVz8gyNcspV5CtFLJUypNXqQNybPVp8-OjhODHD+6KG4oSV7EmEpcXEVKSklavFRAqMrEglFRzaZWUSZGR7A4eFptU5MABOXCRnAAXhERlFBrERvFBNYVCRXuI5sU8pk1PIZH8ElpAeUXokZPY1FooY0YaRAsFQuF-HDrtjhqB4sZRESUjIpeJhMYqWo1DSFWoVvJtC9ZeolOz3M0uV0eqF+SdBTFhaMEGKJbJpbK1tVFYtLWpCVZVnJwWZMu95M4XCB8BQIHBeNC9eQqDR8FBTbdcUJamYSEplFY3l95HZdE7WSrwZqzDtFA5hDrDrCTpBYziRUJxMUSBk5GkZPWJOIzEr6-TVp81DKCaIy5ySNyQmEq5iBma7kVM08FfIzOIFPXzNnCs9JFSpKIZOo5szdv6w0dMAbepPmNO47W5xNLJTl6vWZkaeIHiQd6IVEpKSpRA+UsTw5PVq3NPETEkFM-yUdMZEzbQaRUSQgUQ4FcleFC-UcIA */
	return createMachine(
		{
			context: task || taskFrom({}),
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
			initial: "loading",
			states: {
				loading: {
					always: [
						{
							cond: "isOpened",
							target: "opened"
						},
						{
							cond: "isCompleted",
							target: "completed"
						},
						{
							cond: "isCanceled",
							target: "canceled"
						}
					]
				},
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
			},
			guards: {
				isOpened: (context, event) => !context.canceled && !context.completed,
				isCompleted: (context, event) => !!context.completed,
				isCanceled: (context, event) => !!context.canceled
			}
		}
	);
}
