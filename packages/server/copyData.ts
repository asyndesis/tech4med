const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.join(__dirname, "_seeds");
const destDir = path.join(__dirname, "src", "usingFileStorage", "data");

fs.copySync(sourceDir, destDir, { overwrite: true });

console.log(`✅ Seeds copied from: ${sourceDir} -> ${destDir}`);
