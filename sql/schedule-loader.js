module.exports = {
    CREATE_BYE_TABLE: "CREATE TABLE bye (" +
            "team_id INTEGER NOT NULL REFERENCES team, " +
            "season_year SMALLINT NOT NULL, " +
            "week SMALLINT NOT NULL, " +
            "PRIMARY KEY(team_id, season_year)" +
        ");",

    CREATE_GAME_TABLE: "CREATE TABLE game (" +
            "id INTEGER PRIMARY KEY, " +
            "date DATE NOT NULL, " +
            "type CHAR(4) NOT NULL, " +
            "season_type CHAR(4) NOT NULL, " +
            "week SMALLINT NOT NULL, " +
            "home_team_id INTEGER NOT NULL REFERENCES team, " +
            "visitor_team_id INTEGER NOT NULL REFERENCES team, " +
            "home_score_id INTEGER NOT NULL REFERENCES score, " +
            "visitor_score_id INTEGER NOT NULL REFERENCES score" +
        ");",

    CREATE_SCORE_TABLE: "CREATE TABLE score (" +
            "id SERIAL PRIMARY KEY, " +
            "quarter_one SMALLINT NOT NULL, " +
            "quarter_two SMALLINT NOT NULL, " +
            "quarter_three SMALLINT NOT NULL, " +
            "quarter_four SMALLINT NOT NULL, " +
            "quarter_overtime SMALLINT, " +
            "total SMALLINT NOT NULL" +
        ");",

    CREATE_TEAM_TABLE: "CREATE TABLE team (" +
            "id SERIAL PRIMARY KEY, " +
            "abbreviation CHAR(3) NOT NULL, " +
            "name VARCHAR(30) NOT NULL" +
        ");",

    GAME_EXISTS_QUERY: "SELECT EXISTS " +
        "(SELECT * FROM game WHERE id = $1)",

    INSERT_GAME_DATA: "INSERT INTO game (id, date, type, season_type, week, home_team_id, visitor_team_id, " +
        "home_score_id, visitor_score_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",

    INSERT_SCORE_DATA: "INSERT INTO score (total, quarter_one, quarter_two, quarter_three, " +
        "quarter_four, quarter_overtime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",

    INSERT_TEAM_DATA: "INSERT INTO team (abbreviation, name) VALUES ($1, $2) RETURNING *;",

    TABLE_EXISTS_QUERY: "SELECT EXISTS " +
        "(SELECT * FROM information_schema.tables WHERE table_name = $1)",

    TEAM_ID_QUERY: "SELECT id FROM team WHERE abbreviation = $1"
};