const { QUERY_BYE_BY_YEAR, QUERY_BYE_BY_YEAR_BY_TEAM } = require("../sql/schedule");
const Router = require("express-promise-router");
const Database = require("../db/index");

const router = new Router();

router.get("/byes/:season", (req, res, next) => {
    const season = req.params.season;

    Database.query(QUERY_BYE_BY_YEAR, [season], res, next);
});

router.get("/byes/:season/team/:team", (req, res, next) => {
    const season = req.params.season;
    const team = req.params.team;

    Database.query(QUERY_BYE_BY_YEAR_BY_TEAM, [team, season], res, next);
});

module.exports = router;
