const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
    query: (sql, params, res, next) => pool.query(sql, params)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            return next(err);
        })
};
