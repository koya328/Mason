const express = require("express");
const bodyParser = require("body-parser");
const childProcess = require('child_process');
const fs = require('fs');
const mason = require('./mason');

function read_file(filePath, line) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split("\n");
    return lines[line]
}
var app = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

var username = read_file("user_info.txt", 0)
var password = read_file("user_info.txt", 1)

app.use(express.static('css'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/index", (req, res) => {
  res.render("index");
});

app.get("/use", (req, res) => {
  res.render("use");
});

app.get("/attention", (req, res) => {
  res.render("attention");
});

app.get("/structure", (req, res) => {
  res.render("structure");
});

app.post("/login", (req, res) => {
  mason.startMason(req.body.host, req.body.port, username, password, req.body.version, req.body.player_name, req.body.player_goal, (error) => {
    if (error) {
        console.log(error)
    }
  });
  console.log('Mason starting up...');
  res.render("login");

});

app.listen(8080);
console.log("server is running...");