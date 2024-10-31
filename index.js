const http = require("http");
const fs = require("fs");

const port = 8000;
const time = new Date().getTime();

const myServer = http.createServer((req, res) => {
    console.log("Which Page is this ?");
    // console.log(req.headers.toString());

    fs.appendFile(
        "requestLogs.txt",
        `${time}: ${req.url} - ${
            req.url === "/"
                ? "Home Page"
                : req.url === "/about"
                ? "About Page"
                : req.url === "/favicon.ico"
                ? "Demo"
                : "404 Not Found"
        }\n`,
        (err) => {
            switch (req.url) {
                case "/":
                    res.end("My Home Page");
                    break;
                case "/about":
                    res.end("My About Page");
                    break;
                default:
                    res.end("404 Not Found");
            }
        }
    );
});

myServer.listen(port, () => {
    console.log("Server is running on port :", port);
});
