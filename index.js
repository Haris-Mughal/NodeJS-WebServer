const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 8000;
const time = new Date().getTime();

const myServer = http.createServer((req, res) => {
    // console.log("Which Page is this ?");
    if (req.url === "/favicon.ico") return res.end();

    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);

    fs.appendFile(
        "requestLogs.txt",
        `${time}: ${req.method} ${req.url} - Request added\n`,
        (err) => {
            if (!err) {
                switch (myUrl.pathname) {
                    case "/":
                        res.end("My Home Page");
                        break;
                    case "/about":
                        const name = myUrl.query.name;
                        const id = myUrl.query.id;
                        const age = myUrl.query.age;
                        if (name && id && age) {
                            res.end(
                                `User's name is ${name} and his ID is ${id} and his age is ${age}.`
                            );
                        } else if (name && id) {
                            res.end(
                                `User's name is ${name} and his ID is ${id}.`
                            );
                        } else if (name) {
                            res.end(`User's name is ${name}.`);
                        } else if (id) {
                            res.end(`User's ID is ${id}.`);
                        } else if (age) {
                            res.end(`User's age is ${age}.`);
                        } else {
                            res.end("This is About Page.");
                        }
                        break;
                    case "/search":
                        const searchQuery = myUrl.query.q;
                        if (searchQuery) {
                            res.end(`Here are the results for ${searchQuery}:`);
                        } else {
                            res.end("No search query provided.");
                        }
                        break;
                    case "/signup":
                        if (req.method === "GET") {
                            res.end("This is Sign Up Page");
                        } else {
                            if (req.method === "POST") {
                                // DB Query - sending data to DB
                                res.end("Success");
                            }
                        }
                        break;
                    default:
                        res.end("404 Not Found");
                }
            }
        }
    );
});

myServer.listen(port, () => {
    console.log("Server is running on port :", port);
});
