const http = require('node:http');

// an example of setting http server 
const server = http.createServer((req, res)=>{
    res.write("<h1>Welcome back to http module: createServer() function");
    res.end();
});

server.listen(5001, ()=>{console.log("listening on port 50001: http://localhost:5001")})
