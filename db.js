const { log } = require("console");
const fs = require("fs");
const fileName = "s.json";

function createOne(newData) {
  let oldData = fs.readFileSync(fileName, "utf-8");
  let old = JSON.parse(oldData);
  old.push(newData);
  fs.writeFileSync(fileName, JSON.stringify(old, null, 2), "utf-8");
}

function read(id) {
  let json = fs.readFileSync(fileName, "utf-8");
  let data = JSON.parse(json);
  let obj = data.find((o) => o.id == id);
  return obj;
}
function readAll() {
  let json = fs.readFileSync(fileName, "utf-8");
  let data = JSON.parse(json);
  return data;
}

function update(id, newValue) {
  console.log("From the update method");
  let json = fs.readFileSync(fileName, "utf-8");
  // Parse the data as JSON
  let data = JSON.parse(json);
  id = parseInt(id);
  let idx = search(id, data);
  data[idx] = newValue;
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
}
function search(nameKey, myArray) {
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].id == nameKey) {
      return i;
    }
  }
}
module.exports = {
  createOne,
  readAll,
  read,
  update,
};
