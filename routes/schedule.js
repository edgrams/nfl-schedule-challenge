const { QUERY_BYE_BY_TEAM_BY_YEAR, QUERY_BYE_BY_YEAR } = require("../sql/schedule");
const Router = require("express-promise-router");
const { Pool } = require("pg");

const router = new Router();
const pool = new Pool();

router.get("/byes/:season", (req, res, next) => {
    const season = req.params.season;

    pool.query(QUERY_BYE_BY_YEAR, [season])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        });
});

router.get("/byes/:season/team/:team", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    pool.query(QUERY_BYE_BY_TEAM_BY_YEAR, [team, season])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;