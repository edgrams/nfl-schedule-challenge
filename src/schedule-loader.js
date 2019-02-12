const { CREATE_SCORE_TABLE, CREATE_TEAM_TABLE, TABLE_EXISTS_QUERY } = require("./constants/sql");
const { Client } = require("pg");

initialize().then(() => {
    console.log("Schedule loader completed!");
    process.exit();
}).catch(
    e => console.error(e.stack)
);

async function initialize() {
    console.log("Schedule loader running.");
    console.log("Initializing tables...");

    // initialize client
    const client = new Client();
    await client.connect();

    // creating team
    await createTable(client, 'team', CREATE_TEAM_TABLE);

    // create scores
    await createTable(client, 'score', CREATE_SCORE_TABLE);

    console.log("Tables initialized.");

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