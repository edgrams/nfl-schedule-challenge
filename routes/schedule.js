const { QUERY_BYE_BY_TEAM_BY_YEAR, QUERY_BYE_BY_YEAR } = require("../sql/schedule");
const Router = require("express-promise-router");
const { Pool } = require("pg");

const router = new Router();
const pool = new Pool();

router.get("/byes", (req, res, next) => {
    const season = req.query.season;
    const team = req.query.team;

    if (team) {
        pool.query(QUERY_BYE_BY_TEAM_BY_YEAR, [team, season])
            .then((result) => {
                res.send(result.rows[0]);
            })
            .catch((err) => {
                return next(err);
            });
    } else {
        pool.query(QUERY_BYE_BY_YEAR, [season])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                return next(err);
            });
    }
});

module.exports = router;