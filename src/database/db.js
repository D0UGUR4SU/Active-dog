const Database = require('sqlite-async')

function execute(db) {

    return db.exec(`
    CREATE TABLE IF NOT EXISTS  professionals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        whatsapp TEXT,
        bio TEXT
    );
        
    CREATE TABLE IF NOT EXISTS take_care (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject INTEGER,
        cost TEXT,
<<<<<<< HEAD
        professional_id INTEGER
=======
        professionals_id INTEGER
>>>>>>> master
    );
                
    CREATE TABLE IF NOT EXISTS care_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        take_care_id INTEGER,
        weekday INTEGER,
        time_from INTEGER,
        time_to INTEGER
    );
`)}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)