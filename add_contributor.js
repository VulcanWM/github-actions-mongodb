const { readFileSync, writeFileSync } = require("fs");
const path = "CONTRIBUTORS.json";
const jsonString = readFileSync(path);
const contributors = JSON.parse(jsonString);
contributors['Hello'] = "hi"
writeFileSync(path, JSON.stringify(contributors, null, 2), "utf8");