# nfl-schedule-challenge

### Note: This will only load data from 2014 and beyond due to availability of tracked scoring. 

## Prerequisites:
- nvm installed
- postgres installed

## Installation:
1) ```nvm install 11.9.0```
2) ```nvm use```
3) ```yarn install --production```

## Setup
Before making the API accessible, you will want to load a schedule first:

```./schedule-loader.sh <postgres user> <postgres host> <postgres password> <postgres database> <postgres port> <season type> <season year>```

*Example*: ```./schedule-loader.sh postgres localhost admin postgres 5432 REG 2018```

There is a script to load all season data, to do so run:

```./load-all-seasons.sh <postgres user> <postgres host> <postgres password> <postgres database> <postgres port>```

*Example*: ```./load-all-seasons.sh postgres localhost admin postgres 5432```

After loading season data, start up the API:

```./start.sh <postgres user> <postgres host> <postgres password> <postgres database> <postgres port>```

*Example*: ```./start.sh postgres localhost admin postgres 5432```

## Query API
### schedule bye endpoint
**Route**: bye for all teams: ```http://localhost:3000/schedule/byes/{season}```

*Example*: ```curl "localhost:3000/schedule/byes/2018"```

**Route**: bye per team: ```http://localhost:3000/schedule/byes/{season}/team/{team-abbr}```

*Example*: ```curl "localhost:3000/schedule/byes/2018/team/MIN"```

### game score average endpoint
**Route**: average score for team: ```http://localhost:3000/game/scores/{season}/team/{team-abbr}```

*Example*: ```curl "localhost:3000/game/scores/2018/team/MIN"```

**Route**: average score for team per quarter: ```http://localhost:3000/game/scores/{season}/team/{team-abbr}/quarter/{quarter}```

*Example*: ```curl "localhost:3000/game/scores/2018/team/MIN/quarter/4"```