import http from "http";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import express from "express";

function startExpress() {
	const app = express();
	app.get("/api/show", (req, res) => {
		console.time("slow api");
		const baseNumber = 7;
		let result = 0;

		for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
			result += Math.tan(i) * Math.atan(i);
		}

		console.timeEnd("slow api");

		console.log(`result is ${result} - on process ${process.pid}`);
		res.send(`result is ${result}`);
		// 在响应的时候发送消息
		process.send({ cmd: "notify" });
	});

	app.listen(3000, () => {
		// console.log("app listening on port 3000");
	});
}

// cluster.isPrimary 工头进程，只负责启动其他进程，不做具体工作
if (cluster.isPrimary) {
	console.log(`Master ${process.pid} running.`);
	const cpuLen = cpus().length;
	console.log(`cpu cores is ${cpuLen}`);
	let numReqs = 0;

	function messageHandler(msg) {
		console.log("messageHandler");
		if (msg.cmd && msg.cmd === "notify") {
			numReqs += 1;
		}
	}

	setInterval(() => {
		console.log("numReqs:", numReqs);
	}, 1000);

	// 有几个cpu就启动几个子进程
	for (let i = 0; i < cpuLen; i++) {
		cluster.fork();
	}

	for (const id in cluster.workers) {
		cluster.workers[id].on("message", messageHandler);
	}

	cluster.on("exit", (worker) => {
		console.log(`Worker ${worker.process.pid} died.`);
	});
} else {
	// http.createServer((req, res) => {
	// 	res.writeHead(200);
	// 	res.end("hello world");
	// }).listen("8000");
	// console.log(`worker ${process.pid} is started.`);
	startExpress();
}
