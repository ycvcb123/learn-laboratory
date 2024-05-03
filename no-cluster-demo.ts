import express from "express";
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
});

app.listen(3000, () => {
	console.log("app listening on port 3000");
});
