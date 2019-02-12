const { CREATE_USERS_TABLE, TABLE_EXISTS_QUERY } = require("./sql");
const { Client } = require("pg");

const initialize = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query(TABLE_EXISTS_QUERY, ['users']);
    console.log("response: " + JSON.stringify(res.rows[0]));
    if (!res.rows[0].exists) {
        const res = await client.query(CREATE_USERS_TABLE);
        console.log("response: " + JSON.stringify(res.rows[0]));
    }
    await client.end();
};

initialize().then(() => {
    console.log("Load completed!");
    process.exit();
}).catch(
    e => console.error(e.stack)
);