const http = require("http")
http.createServer(function (request, response) {

  response.writeHead(200, {'Content-Type': 'text/plain'});
  // 发送响应数据 "Hello World"
  response.end('Hello World\n');
}).listen(3000)

console.log('Server running at http://127.0.0.1:3000/');