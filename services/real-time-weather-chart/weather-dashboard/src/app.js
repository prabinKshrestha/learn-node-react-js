import express from "express";


var app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});


// server.js (continuation)
const sseClients = [];


app.get("/sse", function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    sseClients.push(res);

    req.on('close', () => {
      // Remove the response object when the client disconnects
      sseClients.splice(sseClients.indexOf(res), 1);
    });
});

setInterval(() => {
    let data = {
      labels: [],
      data: [],
    };
    for (let index = 0; index < 20; index++) {
      data.labels.push(index);
      data.data.push(index + Math.floor(Math.random() * 10));
    }
  // Send a message to all connected clients at regular intervals
  sseClients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}, 10 * 1000); // Send an SSE message every 1 second



// const activeConnections = [];

// app.get('/sse', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.flushHeaders();

//   activeConnections.push(res);

//   req.on('close', () => {
//     activeConnections.splice(activeConnections.indexOf(res), 1);
//   });
// });

// setInterval(() => {
//   let data = {
//     labels: [],
//     data: [],
//   }
//   for (let index = 0; index < 20; index++) {
//     data.labels.push(index);
//     data.data.push(index + Math.floor(Math.random() * 10));
//   }
//   activeConnections.forEach((sseRes) => {
//     sseRes.write(JSON.stringify(data));
//   });
// }, 10 * 1000)


app.listen(3000);
