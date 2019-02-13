#!/usr/bin/env bash
PGUSER=$1 PGHOST=$2 PGPASSWORD=$3 PGDATABASE=$4 PGPORT=$5 SEASON_TYPE=$6 SEASON_YEAR=$7 node schedule-loader.js