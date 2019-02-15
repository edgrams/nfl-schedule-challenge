const { QUERY_SCORE_AVG_BY_TEAM_BY_YEAR } = require("../sql/scores");
const Router = require("express-promise-router");
const { Pool } = require("pg");

const router = new Router();
const pool = new Pool();

router.get("/scores/:season/team/:team", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    pool.query(QUERY_SCORE_AVG_BY_TEAM_BY_YEAR, [team, season])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;