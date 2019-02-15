const { CREATE_TEMP_TABLE, INSERT_TEMP_TABLE, QUERY_BYE_BY_TEAM } = require("../sql/schedule");
const Router = require("express-promise-router");
const { Pool } = require("pg");

const router = new Router();
const pool = new Pool();

router.get("/byes", async (req, res) => {
    let season = req.query.season;
    let team = req.query.team;

/*    const { rows } = await pool.query(CREATE_TEMP_TABLE)
        .then(pool.query(INSERT_TEMP_TABLE))
        .then(pool.query(QUERY_BYE_BY_TEAM, [team, season]));*/

    res.send(rows[0]);
});

module.exports = router;