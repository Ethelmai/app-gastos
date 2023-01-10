const fs = require("fs");

const retrieve = (entity) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./data/${entity}.json`, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}

const save = (entity, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./data/${entity}.json`, JSON.stringify(data), (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve("Ok");
    });
  });
};

module.exports = { retrieve, save };
