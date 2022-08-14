import React from "react";

// if (typeof window !== "undefined")
// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 	// @ts-ignore
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// 	window.SQL = require("sql.js/dist/sql-wasm");

const Whenner: React.FC = () => {
	return <div>Hello world!</div>;
	// const [em, setEm] = useState<null | EntityManager>(null);
	// const [tasks, setTasks] = useState<TaskEntity[]>([]);
	// useEffect(() => {
	// 	async function connect() {
	// 		const conn = await WhennerDataSource.initialize();
	// 		const em = conn.createEntityManager();
	// 		setEm(em);
	// 	}

	// 	connect()
	// 		.then(() => {
	// 			console.log("connected");
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [em]);

	// if (em) {
	// 	const task = new TaskEntity({
	// 		title: `Task created ${Time.current().toDateString()}`
	// 	});
	// 	em
	// 		.save(task)
	// 		.then(() => console.log("Saved test entity"))
	// 		.catch((err) => console.log(err));
	// 	em
	// 		.find(TaskEntity)
	// 		.then((entities) => setTasks(entities))
	// 		.catch((err) => console.log(err));
	// }

	// return (
	// 	<div>
	// 		{tasks.map((task) => (
	// 			<div>
	// 				{task.title} <br />
	// 			</div>
	// 		))}
	// 	</div>
	// );
};

export default Whenner;
