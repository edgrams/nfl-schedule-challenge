
module.exports = {
    TABLE_EXISTS_QUERY: "SELECT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = $1)",
    CREATE_USERS_TABLE: "CREATE TABLE users (ID SERIAL PRIMARY KEY, name VARCHAR(30));"
};