
const { test } = require("./index");

describe("index", () => {
    describe("test", () => {
        it("should return a plus b", () => {
            const result = test(1, 2);

            expect(result).toEqual(3);
        });
    });
});