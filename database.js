/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init todo and category tables if they don't exist */
let init = function () {
    db.run(`CREATE TABLE if not exists todo(subject TEXT NOT NULL,status TEXT,
         created TEXT, modified TEXT, category TEXT,PRIMARY KEY ( subject, category))`);
      

    db.run(`CREATE TABLE if not exists category(name TEXT PRIMARY KEY,created TEXT, modified TEXT)`);
        

};

module.exports = {
    init: init,
    db: db
};
