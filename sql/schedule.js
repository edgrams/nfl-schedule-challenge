module.exports = {
    CREATE_TEMP_TABLE: "CREATE TEMP TABLE weeks (week int); ",
    INSERT_TEMP_TABLE: "INSERT INTO weeks (week) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10)," +
        "(11),(12),(13),(14),(15),(16),(17); ",
    QUERY_BYE_BY_TEAM: "SELECT team.abbreviation, weeks.week FROM team, weeks " +
            "WHERE team.abbreviation = $1 " +
            "AND weeks.week NOT IN (SELECT game.week FROM game " +
                               "WHERE (game.home_team_id = team.id OR game.visitor_team_id = team.id) " +
                               "AND DATE_PART('year', game.date) = $2);"
};