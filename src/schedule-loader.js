const { CREATE_GAME_TABLE, CREATE_SCORE_TABLE, CREATE_TEAM_TABLE, GAME_EXISTS_QUERY,
    INSERT_TEAM_DATA, TABLE_EXISTS_QUERY, TEAM_ID_QUERY } = require("./constants/sql");
const { Client } = require("pg");
const rp = require('request-promise');

console.log("Schedule loader running.");

const client = new Client();

openDatabaseConnection()
    .then(initializeTables).catch(e => console.error(e.stack))
    .then(getScheduleData).catch(e => console.error(e.stack))
    .then(loadScheduleData).catch(e => console.error(e.stack))
    .then(closeDatabaseConnection).catch(e => console.error(e.stack))
    .finally(() => {
        console.log("Schedule loader completed!");
        process.exit();
    });

async function openDatabaseConnection() {
    client.connect();
}

async function closeDatabaseConnection() {
    client.end();
}

async function initializeTables() {
    console.log("Initializing tables...");

    await createTable('team', CREATE_TEAM_TABLE);
    await createTable('score', CREATE_SCORE_TABLE);
    await createTable('game', CREATE_GAME_TABLE);

    console.log("Tables initialized.");
}

async function loadScheduleData(data) {
    console.log("Loading scheduled data ...");

    console.log(data[0]);

    // see if game exists
    const gameId = data[0].gameId;
    const res = await client.query(GAME_EXISTS_QUERY, [gameId]);
    console.log(`Game id ${gameId} exists: ` + JSON.stringify(res.rows[0]));
    if (!res.rows[0].exists) {
        console.log("We're in!");

        // teams
        const visitorTeamId = await loadTeam(data[0].visitorTeam.abbr, data[0].visitorTeam.fullName);
        const homeTeamId = await loadTeam(data[0].homeTeam.abbr, data[0].homeTeam.fullName);
    }

    console.log("Done.");
}

async function loadTeam(abbreviation, fullName) {
    let teamId;
    const teamResponse = await client.query(TEAM_ID_QUERY, [abbreviation]);
    if (teamResponse.rowCount === 0) {
        const newTeamResponse = await client.query(INSERT_TEAM_DATA, [abbreviation, fullName]);
        teamId = newTeamResponse.rows[0].id;
    } else {
        teamId = teamResponse.rows[0].id;
    }

    return teamId;
}

async function getScheduleData() {
    const seasonType = process.env.SEASON_TYPE;
    const seasonYear = process.env.SEASON_YEAR;

    const scheduleUrl = `http://api.ngs.nfl.com/league/schedule?season=${seasonYear}&seasonType=${seasonType}`;

    const options = {
        uri: scheduleUrl,
        json: true
    };

    return rp(options);
}

async function createTable(table, sql) {
    const res = await client.query(TABLE_EXISTS_QUERY, [table]);
    console.log(`${table} exists: ` + JSON.stringify(res.rows[0]));
    if (!res.rows[0].exists) {
        const res = await client.query(sql);
        console.log("response: " + JSON.stringify(res));
    }
}