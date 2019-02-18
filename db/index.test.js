jest.mock("pg");

const Database = require("./index");
const { Pool } = require("pg");

describe("index", () => {
    describe("query", () => {
        const sql = "sql";
        const params = ["param"];

        it("should request query from pool", () => {
            const mockPool = new Pool();
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve({});
                }));
            Database.getPool = jest.fn(() => {
                return mockPool;
            });

            Database.query(sql, params);

            expect(mockPool.query).toHaveBeenCalledTimes(1);
        });
    });
});