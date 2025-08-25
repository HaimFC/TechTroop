const http = require('http')

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    console.log(req.method)
    console.log(req.url)
    if (req.url === "/") {
        res.write("Welcome to my server!");
    } 
    else if (req.url === "/about") {
        res.write("This is the about page");
    } 
    else if (req.url === "/contact") {
        res.write("Haim Cohen - haimtehem@gmail.com");
    } else {
        res.statusCode = 404;
        res.write("404 - Page not found");
    }

  res.end();
});

const port = 3000
server.listen(port, function () {
    console.log(`Node server created at port ${port}`)
})
