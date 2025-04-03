const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const { createOne, readAll, read, update } = require("./db");
const API = "https://us-central1-swe206-221.cloudfunctions.net/app/UserSignIn";

app.use(cors());
// app.use(express.urlencoded({ extended: false, type: "application/json" }));
app.use(express.json());

app.get("/auth/login", async (req, res) => {
  const authheader = req.headers.authorization;
  if (!authheader) {
    res.status(401).json("No auth header");
    return;
  }
  const auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];
  const response = await fetch(`${API}?username=${user}&password=${pass}`);
  if (!response.ok) {
    res.status(401).json("No access");
    return;
  }
  const data = await response.json();
  res.status(200).json(data);
});

app.post("/addTournament", (req, res) => {
  let data = req.body;
  createOne(data);
  res.status(200).json(req.body);
});

app.get("/getTournaments", (req, res) => {
  let data = readAll();
  res.send(data);
});

app.get("/getTournament/:id", (req, res) => {
  let { id } = req.params;
  let data = read(id);
  res.send(data);
});
app.post("/updateTournamen/:id", (req, res) => {
  let { id } = req.params;
  let data = req.body;
  update(id, data);
  res.json(read(id));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
