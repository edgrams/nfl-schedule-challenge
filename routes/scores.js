const { QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_ONE: QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_ONE, QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_TWO: QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_TWO,
    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_THREE: QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_THREE, QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_FOUR: QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_FOUR,
    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR: QUERY_SCORE_AVG_BY_YEAR_BY_TEAM } = require("../sql/scores");
const Router = require("express-promise-router");
const Database = require("../db");

const router = new Router();

router.get("/scores/:season/team/:team", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    Database.query(QUERY_SCORE_AVG_BY_YEAR_BY_TEAM, [team, season], res, next);
});

router.get("/scores/:season/team/:team/quarter/1", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    Database.query(QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_ONE, [team, season], res, next);
});

router.get("/scores/:season/team/:team/quarter/2", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    Database.query(QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_TWO, [team, season], res, next);
});

router.get("/scores/:season/team/:team/quarter/3", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    Database.query(QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_THREE, [team, season], res, next);
});

router.get("/scores/:season/team/:team/quarter/4", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    Database.query(QUERY_SCORE_AVG_BY_YEAR_BY_TEAM_BY_QUARTER_FOUR, [team, season], res, next);
});

module.exports = router;
