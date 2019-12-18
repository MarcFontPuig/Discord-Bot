var http = require('http');

const port = process.env.PORT || 8000;

http.createServer(function (req, res) {
  res.write("Érite live");
  res.end();
}).listen(port);
