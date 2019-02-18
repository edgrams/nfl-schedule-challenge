jest.mock("pg");

const Database = require("../../src/db/index");
const { Pool } = require("pg");

describe("index", () => {
    describe("getPool", () => {
        it("should return pool", () => {
            const result = Database.getPool();

            expect(result).toBeInstanceOf(Pool);
        });
    });

    describe("query", () => {
        const sql = "sql";
        const params = ["param"];

        const mockResponse = {
            send: jest.fn()
        };

        it("should request getPool", () => {
            const mockPool = new Pool();
            Database.getPool = jest.fn(() => {
                return mockPool;
            });
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve({});
                }));

            Database.query(sql, params, mockResponse);

            expect(Database.getPool).toHaveBeenCalled();
        });

        it("should request query from pool", () => {
            const mockPool = new Pool();
            Database.getPool = jest.fn(() => {
                return mockPool;
            });
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve({});
                }));

            Database.query(sql, params, mockResponse);

            expect(mockPool.query).toHaveBeenCalledWith(sql, params);
        });

        it("should request send from response with result when resolved", async() => {
            const rows = [];
            const result = {
                rows: rows
            };
            const mockPool = new Pool();
            Database.getPool = jest.fn(() => {
                return mockPool;
            });
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve) => {
                    resolve(result);
                }));

            await Database.query(sql, params, mockResponse);

            expect(mockResponse.send).toHaveBeenCalledWith(rows);
        });

        it("should request next with error when rejected", async() => {
            const result = new Error("error");
            const mockNext = jest.fn();
            const mockPool = new Pool();
            Database.getPool = jest.fn(() => {
                return mockPool;
            });
            mockPool.query
                .mockReturnValueOnce(new Promise((resolve, reject) => {
                    reject(result);
                }));

            await Database.query(sql, params, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith(result);
        });
    });
});
