const schedule = require('./schedule');
const scores = require('./scores');

module.exports = (app) => {
    app.use('/schedule', schedule);
    app.use('/game', scores);
};
