const { Pool } = require("pg");

let pool;

module.exports = {
    query: (sql, params, res, next) => {
        const pool = getPool();
        pool.query(sql, params)
    }


            /*    .then((result) => {
                    res.send(result.rows);
                })
                .catch((err) => {
                    return next(err);
                }),*/
};

function getPool() {
    if (!pool) {
        pool = new Pool();
    }

    return pool;
}