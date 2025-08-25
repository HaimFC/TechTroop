const http = require('http')

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    console.log(req.method)
    console.log(req.url)
    if (req.url === "/") {
        res.write(JSON.stringify("Welcome to my server!"));
    }
    else if (req.url === "/api") {
        res.write(JSON.stringify("API sections! \n How to use \n GET /api/users - return all users \n GET /api/users/:id return specific user by ID \n POST /api/users add a new user (by JSON format)"));
    }  
    else if (req.url.startsWith("/api/users")) {
        if (req.url === "/api/users") {
            if(req.method === "GET"){
                res.write(JSON.stringify(users))
            }
            else if (req.method === "POST"){
                const newUser = await readBody(req);
                if (newUser && newUser.name && newUser.email){
                    newUser.id = users[users.length - 1].id + 1;
                    users.push(newUser);
                    res.write(JSON.stringify(newUser));
                } 
                else {
                    res.statusCode = 400;
                    res.write(JSON.stringify("body must include content"))
                }
            }
        }
        else {
            const idStr = req.url.split("/").pop();
            const id = Number(idStr);
            const user = users.find(u => u.id === id);

            if(user){
                console.log(user);
                res.write(JSON.stringify(user));
                console.log(user);
            }
            else{
                res.statusCode = 400;
                res.write(JSON.stringify("User not found"));
            }
        }
    }
    else {
        res.statusCode = 404;
        res.write(JSON.stringify("404 - Page not found"));
    }

  res.end();
});

const port = 3000
server.listen(port, function () {
    console.log(`Node server created at port ${port}`)
})

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(JSON.parse(body));
      });
  });
}