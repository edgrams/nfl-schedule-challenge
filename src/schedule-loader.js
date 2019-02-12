const { CREATE_TEAM_TABLE, TABLE_EXISTS_QUERY } = require("./constants/sql");
const { Client } = require("pg");

const initialize = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query(TABLE_EXISTS_QUERY, ['team']);
    console.log("response: " + JSON.stringify(res.rows[0]));
    if (!res.rows[0].exists) {
        const res = await client.query(CREATE_TEAM_TABLE);
        console.log("response: " + JSON.stringify(res));
    }
    await client.end();
};

initialize().then(() => {
    console.log("Schedule load completed!");
    process.exit();
}).catch(
    e => console.error(e.stack)
);