const { QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_ONE, QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_TWO,
    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_THREE, QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_FOUR,
    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR } = require("../sql/scores");
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

router.get("/scores/:season/team/:team/quarter/1", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    pool.query(QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_ONE, [team, season])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        });
});

router.get("/scores/:season/team/:team/quarter/2", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    pool.query(QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_TWO, [team, season])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        });
});

router.get("/scores/:season/team/:team/quarter/3", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    pool.query(QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_THREE, [team, season])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        });
});

router.get("/scores/:season/team/:team/quarter/4", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    pool.query(QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_FOUR, [team, season])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;