const { QUERY_BYE_BY_TEAM } = require("../sql/schedule");
const Router = require("express-promise-router");
const { Pool } = require("pg");

const router = new Router();
const pool = new Pool();

router.get("/byes", (req, res, next) => {
    let season = req.query.season;
    let team = req.query.team;

    pool.query(QUERY_BYE_BY_TEAM, [team, season])
        .then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;