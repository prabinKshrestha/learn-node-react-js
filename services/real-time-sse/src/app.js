var express = require('express');

var app = new express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render('index');
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
  // Send a message to all connected clients at regular intervals
  sseClients.forEach((client) => {
    client.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  });
}, 1000); // Send an SSE message every 1 second


app.listen(3000);