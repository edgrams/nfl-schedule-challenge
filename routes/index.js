const byes = require("./byes");

module.exports = (app) => {
  app.use("/byes", byes);
};