import http from "http";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";

// n 总过发送多少个请求
// c concurrency 同时有几个客户端在发送请求
// rps request per seconds 每秒发送多少个请求
// loadtest -n 400 -c 10 --rps 200 http://mysite.com/

// cluster.isPrimary 工头进程，只负责启动其他进程，不做具体工作
if (cluster.isPrimary) {
	console.log(`Master ${process.pid} running.`);
	const cpuLen = cpus().length;
	console.log(`cpu cores is ${cpuLen}`);
	// 有几个cpu就启动几个子进程
	for (let i = 0; i < cpuLen; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker) => {
		console.log(`Worker ${worker.process.pid} died.`);
	});
} else {
	http.createServer((req, res) => {
		res.writeHead(200);
		res.end("hello world");
	}).listen("8000");

	console.log(`worker ${process.pid} is started.`);
}
