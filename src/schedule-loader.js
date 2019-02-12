const { CREATE_SCORE_TABLE, CREATE_TEAM_TABLE, TABLE_EXISTS_QUERY } = require("./constants/sql");
const { Client } = require("pg");

initialize().then(() => {
    console.log("Schedule load completed!");
    process.exit();
}).catch(
    e => console.error(e.stack)
);

async function initialize() {
    // initialize client
    const client = new Client();
    await client.connect();

    // load team
    await createTable(client, 'team', CREATE_TEAM_TABLE);

    // load scores
    await createTable(client, 'score', CREATE_SCORE_TABLE);

    // close connection
    await client.end();
}

async function createTable(client, table, sql) {
    const res = await client.query(TABLE_EXISTS_QUERY, [table]);
    console.log(`${table} exists: ` + JSON.stringify(res.rows[0]));
    if (!res.rows[0].exists) {
        const res = await client.query(sql);
        console.log("response: " + JSON.stringify(res));
    }
}