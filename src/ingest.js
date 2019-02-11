const createTable = "CREATE TABLE users (ID SERIAL PRIMARY KEY, name VARCHAR(30));";
const tableExistsQuery = "SELECT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')";
const { Client } = require('pg');

const initialize = async () => {
    const client = new Client();
    await client.connect();
    const res = await client.query(tableExistsQuery);
    console.log("response: " + JSON.stringify(res.rows[0]));
    if (!res.rows[0].exists) {
        const res = await client.query(createTable);
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