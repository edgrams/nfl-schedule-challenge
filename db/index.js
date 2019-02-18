const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
    getPool: () => {
        return pool;
    },

    query: (sql, params, res, next) => {
        module.exports.getPool().query(sql, params)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                return next(err);
            })
    }
};