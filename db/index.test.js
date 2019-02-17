jest.mock("pg");

const { Pool } = require("pg");
const Database = require("./index");

describe("index", () => {
    describe("query", () => {
        const sql = "sql";
        const params = ["param"];

        it("should create instance from pool", () => {
            Database.query(sql, params);

            expect(Pool).toHaveBeenCalledTimes(1);
        });
    });
});