const { CREATE_BYE_TABLE, CREATE_GAME_TABLE, CREATE_SCORE_TABLE, CREATE_TEAM_TABLE, GAME_EXISTS_QUERY,
    INSERT_BYE_DATA, INSERT_GAME_DATA, INSERT_SCORE_DATA, INSERT_TEAM_DATA, TABLE_EXISTS_QUERY,
    TEAM_ID_QUERY } = require("./sql/schedule-loader");
const { Client } = require("pg");
const rp = require('request-promise');

console.log("Schedule loader running.");

const client = new Client();
const leagueUnplayedWeeks = new Map();

const seasonType = process.env.SEASON_TYPE;
const seasonYear = process.env.SEASON_YEAR;

openDatabaseConnection().catch(e => console.error(e.stack))
    .then(initializeTables)
    .then(getScheduleData)
    .then(loadScheduleData)
    .then(closeDatabaseConnection)
    .then(() => {
        console.log("Schedule loader completed!");
        process.exit();
    });

function getGameSet() {
    const weeks = Array(17).fill().map((_, i) => i + 1);
    return new Set(weeks);
}

async function openDatabaseConnection() {
    client.connect();
}

async function closeDatabaseConnection() {
    client.end();
}

async function initializeTables() {
    console.log("Initializing tables...");

    await createTable('team', CREATE_TEAM_TABLE);
    await createTable('bye', CREATE_BYE_TABLE);
    await createTable('score', CREATE_SCORE_TABLE);
    await createTable('game', CREATE_GAME_TABLE);

    console.log("Tables initialized.");
}

async function loadScheduleData(data) {
    console.log("Loading schedule data ...");

    for (let i = 0; i < data.length; i++) {
        await loadScheduledGame(data[i]);
    }

    for (const [key, value] of leagueUnplayedWeeks.entries()) {
        const week = value.values().next().value;
        await loadBye(key, seasonYear, week);
        console.log(`Loading bye for team[${key}] = ${week}.`)
    }

    console.log("Done loading schedule data.");
}

async function loadScheduledGame(game) {
    const gameIdResponse = await client.query(GAME_EXISTS_QUERY, [game.gameId]);
    if (!gameIdResponse.rows[0].exists) {
        const homeTeamId = await loadTeam(game.homeTeam);
        const visitorTeamId = await loadTeam(game.visitorTeam);

        const homeScoreId = await loadScore(game.score.homeTeamScore);
        const visitorScoreId = await loadScore(game.score.visitorTeamScore);

        const gameId = await loadGame(game, homeTeamId, visitorTeamId, homeScoreId, visitorScoreId);
        console.log(`Game id ${gameId} is loaded.`);

        registerWeekForTeam(homeTeamId, game.week);
        registerWeekForTeam(visitorTeamId, game.week);
    } else {
        console.log(`Game id ${game.gameId} is already loaded.`);
    }
}

function registerWeekForTeam(teamId, week) {
    let teamUnplayedWeeks;
    if (leagueUnplayedWeeks.has(teamId)) {
        teamUnplayedWeeks = leagueUnplayedWeeks.get(teamId);
    } else {
        teamUnplayedWeeks = getGameSet();
    }

    teamUnplayedWeeks.delete(week);
    leagueUnplayedWeeks.set(teamId, teamUnplayedWeeks);
}

async function loadBye(teamId, seasonYear, week) {
    const newByeResponse = await client.query(INSERT_BYE_DATA, [teamId, seasonYear, week]);
}

async function loadGame(game, homeTeamId, visitorTeamId, homeScoreId, visitorScoreId) {
    const newGameResponse = await client.query(INSERT_GAME_DATA, [game.gameId, game.gameDate, game.gameType,
        game.seasonType, game.week, homeTeamId, visitorTeamId, homeScoreId, visitorScoreId]);
    return newGameResponse.rows[0].id;
}

async function loadScore(score) {
    const newScoreResponse = await client.query(INSERT_SCORE_DATA, [score.pointTotal, score.pointQ1, score.pointQ2,
        score.pointQ3, score.pointQ4, score.pointOT]);
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
    const scheduleUrl = `http://api.ngs.nfl.com/league/schedule?season=${seasonYear}&seasonType=${seasonType}`;

    const options = {
        uri: scheduleUrl,
        json: true
    };

    return rp(options);
}

async function createTable(table, sql) {
    const tableExistsResponse = await client.query(TABLE_EXISTS_QUERY, [table]);
    if (!tableExistsResponse.rows[0].exists) {
        await client.query(sql);
    }
}