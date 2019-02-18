jest.mock("pg");

const Database = require("./index");
const { Pool } = require("pg");

describe("index", () => {
    describe("getPool", () => {
        it ("should return pool", () => {
            const result = Database.getPool();

            expect(result).toBeInstanceOf(Pool);
        });
    });

    describe("query", () => {
        const sql = "sql";
        const params = ["param"];

        const mockPool = new Pool();
        Database.getPool = jest.fn(() => {
            return mockPool;
        });
        const mockResponse = {
            send: jest.fn()
        };

        it("should request getPool", () => {
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve({});
                }));

            Database.query(sql, params, mockResponse);

            expect(Database.getPool).toHaveBeenCalled();
        });

        it("should request query from pool", () => {
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve({});
                }));

            Database.query(sql, params, mockResponse);

            expect(mockPool.query).toHaveBeenCalledWith(sql, params);
        });

        it("should request send from response with result when resolved", async () => {
            const rows = [];
            const result = {
                rows: rows
            };
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve(result);
                }));

            await Database.query(sql, params, mockResponse);

            expect(mockResponse.send).toHaveBeenCalledWith(rows);
        });

        it("should request next with error when rejected", async () => {
            const result = new Error("error");
            const mockNext = jest.fn();
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve, reject) => {
                    reject(result);
                }));

            await Database.query(sql, params, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith(result);
        });
    });
});