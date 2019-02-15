const schedule = require("./schedule");

module.exports = (app) => {
  app.use("/schedule", schedule);
};