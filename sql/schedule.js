module.exports = {
    QUERY_BYE_BY_TEAM_BY_YEAR: 'SELECT team.abbreviation, bye.week FROM team ' +
        'INNER JOIN bye ON team.id = bye.team_id ' +
        'WHERE team.abbreviation = $1 AND bye.season_year = $2;',

    QUERY_BYE_BY_YEAR: 'SELECT team.abbreviation, bye.week FROM team ' +
        'INNER JOIN bye ON team.id = bye.team_id ' +
        'WHERE bye.season_year = $1;'
};
