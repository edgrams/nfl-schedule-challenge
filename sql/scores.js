module.exports = {
    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR: "SELECT team.abbreviation, " +
        "to_char(AVG(score.total), 'FM999999999.00') AS POINT_AVERAGE FROM score " +
        "INNER JOIN team ON score.team_id = team.id " +
        "INNER JOIN game ON score.game_id = game.id " +
        "INNER JOIN bye ON team.id = bye.team_id " +
        "WHERE team.abbreviation = $1 " +
        "AND game.week > bye.week " +
        "AND bye.season_year = $2 " +
        "GROUP BY team.abbreviation;",

    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_ONE: "SELECT team.abbreviation, " +
        "to_char(AVG(score.quarter_one), 'FM999999999.00') AS POINT_AVERAGE FROM score " +
        "INNER JOIN team ON score.team_id = team.id " +
        "INNER JOIN game ON score.game_id = game.id " +
        "INNER JOIN bye ON team.id = bye.team_id " +
        "WHERE team.abbreviation = $1 " +
        "AND game.week > bye.week " +
        "AND bye.season_year = $2 " +
        "GROUP BY team.abbreviation;",

    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_TWO: "SELECT team.abbreviation, " +
        "to_char(AVG(score.quarter_two), 'FM999999999.00') AS POINT_AVERAGE FROM score " +
        "INNER JOIN team ON score.team_id = team.id " +
        "INNER JOIN game ON score.game_id = game.id " +
        "INNER JOIN bye ON team.id = bye.team_id " +
        "WHERE team.abbreviation = $1 " +
        "AND game.week > bye.week " +
        "AND bye.season_year = $2 " +
        "GROUP BY team.abbreviation;",

    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_THREE: "SELECT team.abbreviation, " +
        "to_char(AVG(score.quarter_three), 'FM999999999.00') AS POINT_AVERAGE FROM score " +
        "INNER JOIN team ON score.team_id = team.id " +
        "INNER JOIN game ON score.game_id = game.id " +
        "INNER JOIN bye ON team.id = bye.team_id " +
        "WHERE team.abbreviation = $1 " +
        "AND game.week > bye.week " +
        "AND bye.season_year = $2 " +
        "GROUP BY team.abbreviation;",

    QUERY_SCORE_AVG_BY_TEAM_BY_YEAR_BY_QUARTER_FOUR: "SELECT team.abbreviation, " +
        "to_char(AVG(score.quarter_four), 'FM999999999.00') AS POINT_AVERAGE FROM score " +
        "INNER JOIN team ON score.team_id = team.id " +
        "INNER JOIN game ON score.game_id = game.id " +
        "INNER JOIN bye ON team.id = bye.team_id " +
        "WHERE team.abbreviation = $1 " +
        "AND game.week > bye.week " +
        "AND bye.season_year = $2 " +
        "GROUP BY team.abbreviation;"
};
