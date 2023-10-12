var http = require('http')
var fs = require('fs')

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    let url = request.url;
    if (url === "/home" || url === "/") {
        var readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
        readStream.pipe(response);
    } else if (url === "/contact") {
        var readStream = fs.createReadStream(__dirname + '/contact.html', 'utf8');
        readStream.pipe(response);
    } else if (fs.existsSync(__dirname + url)) {
        var readStream = fs.createReadStream(__dirname + url, 'utf8');
        readStream.pipe(response);
    } else {
        var readStream = fs.createReadStream(__dirname + "/404.html", 'utf8');
        readStream.pipe(response);
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');