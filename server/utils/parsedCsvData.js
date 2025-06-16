const fs = require("fs");
const csv = require("csv-parser");

function parseCsv(filePath) {
  return new Promise((resolve, reject) => {
    const resultData = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => resultData.push(data))
      .on("end", () => resolve(resultData))
      .on("error", reject);
  });
}

module.exports = parseCsv;
