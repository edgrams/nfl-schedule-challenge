module.exports = {
    CREATE_GAME_TABLE: "CREATE TABLE game (" +
        "id SMALLINT PRIMARY KEY, " +
        "abbreviation CHAR(3) NOT NULL, " +
        "name VARCHAR(30) NOT NULL " +
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
            "id SMALLINT PRIMARY KEY, " +
            "abbreviation CHAR(3) NOT NULL, " +
            "name VARCHAR(30) NOT NULL" +
        ");",

    TABLE_EXISTS_QUERY: "SELECT EXISTS " +
        "(SELECT * FROM information_schema.tables WHERE table_name = $1)"
};