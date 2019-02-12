const { CREATE_GAME_TABLE, CREATE_SCORE_TABLE, CREATE_TEAM_TABLE, GAME_EXISTS_QUERY, INSERT_SCORE_DATA,
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
    console.log("Loading schedule data ...");

    console.log(data[0]);

    const gameId = data[0].gameId;
    const gameIdResponse = await client.query(GAME_EXISTS_QUERY, [gameId]);
    console.log(`Game id ${gameId} exists: ` + JSON.stringify(gameIdResponse.rows[0]));
    if (!gameIdResponse.rows[0].exists) {
        console.log("We're in!");

        const game = data[0];

        // score
        const visitorScoreId = await loadScore(game.score.visitorTeamScore);
        const homeScoreId = await loadScore(game.score.homeTeamScore);

        // teams
        const visitorTeamId = await loadTeam(game.visitorTeam);
        const homeTeamId = await loadTeam(game.homeTeam);
    }

    console.log("Done.");
}

async function loadScore(score) {
    const newScoreResponse = await client.query(INSERT_SCORE_DATA, [score.pointTotal, score.pointQ1, score.pointQ2,
        score.pointQ3, score.pointQ4, score.pointOT]);
    console.log(newScoreResponse.rows[0].id);
    return newScoreResponse.rows[0].id;
}

async function loadTeam(team) {
    let teamId;
    const teamResponse = await client.query(TEAM_ID_QUERY, [team.abbr]);
    if (teamResponse.rowCount === 0) {
        const newTeamResponse = await client.query(INSERT_TEAM_DATA, [team.abbr, team.fullName]);
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