module.exports = {
    QUERY_BYE_BY_TEAM: "SELECT team.abbreviation, bye.week FROM team " +
        "INNER JOIN bye ON team.id = bye.team_id " +
        "WHERE team.abbreviation = $1 AND bye.season_year = $2;"
};