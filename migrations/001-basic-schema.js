module.exports = {
    up(migration) {
        return migration.sequelize.query(`
            CREATE TABLE airports (
                code varchar(3) PRIMARY KEY,
                name varchar(50),
                address varchar(255)
            );
        `).then(() => migration.sequelize.query(`
            CREATE TABLE airlines (
                abbreviation varchar(3) PRIMARY KEY,
                name varchar(255)
            );
        `)).then(() => migration.sequelize.query(`
            CREATE TABLE flights (
                number varchar(10) PRIMARY KEY,
                origin varchar(3) REFERENCES airports(code) ON UPDATE CASCADE,
                dest varchar(3) REFERENCES airports(code) ON UPDATE CASCADE,
                airline varchar(3) REFERENCES airlines(abbreviation) ON UPDATE CASCADE,
                duration decimal(10,2),
                distance decimal(10,2),
                price decimal(10,2)
            );
        `))
    },
    down(migration) {
       return migration.sequelize
           .query(`DROP TABLE flights;`)
           .then(() => migration.sequelize.query(`DROP TABLE airlines;`))
           .then(() => migration.sequelize.query(`DROP TABLE airports;`));
    }
};
