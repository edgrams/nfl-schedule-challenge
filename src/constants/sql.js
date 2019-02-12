module.exports = {
    CREATE_TEAM_TABLE: "CREATE TABLE team (" +
            "id SMALLINT PRIMARY KEY, " +
            "abbreviation CHAR(3) NOT NULL, " +
            "name VARCHAR(30) NOT NULL " +
        ");",
    TABLE_EXISTS_QUERY: "SELECT EXISTS " +
        "(SELECT * FROM information_schema.tables WHERE table_name = $1)"
};