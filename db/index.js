const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
    getPool: pool,

    query: async(sql, params, res, next) => {
        await module.exports.getPool().query(sql, params)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                next(err);
            });
    }
};
