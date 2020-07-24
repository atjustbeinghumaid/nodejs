const mysql = require('mysql');


module.exports = class SqlCRUD{
    constructor(){
        console.log("inside sql constructor");
        this.con = mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: "@darerspoof",
            port:3306
        });
    }
    connectDB(){
        var conn = this.con;
        conn.connect(function(err){
            if (err) throw err;

            console.log("connected!!!")
            conn.query("CREATE DATABASE IF NOT EXISTS potterverse", function (err, result) {
                if (err) throw err;
                console.log("Database created", result.message);
                });
    
            conn.query("CREATE TABLE IF NOT EXISTS potterverse.spells (__id VARCHAR(255) PRIMARY KEY, spell VARCHAR(255),type VARCHAR(255),effect VARCHAR(255))", function(err, result){
                if (err) throw err;
                console.log("table created");
            });

        })
        
    }
    insertSpells(values){

        this.con.query("INSERT IGNORE INTO potterverse.spells VALUES (?)", [values], function(err, result){
            if (err) throw err;
            console.log(`inserted ${result.affectedRows} record`);
        })
        
    }
    readSpells(filters = null){
        var sql;
        if(!filters)
            var sql = "SELECT * FROM potterverse.spells";
        this.con.query(sql, function(err, result){
            if (err) throw err;
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.__id, row.spell, row.type, row.effect);
              });
        })
        
    }
    updateSpell(update){
        var sql = 
        `UPDATE potterverse.spells SET ${update.setfield} = '${update.setfieldVal}' 
                                        WHERE ${update.field} LIKE '${update.fieldVal}'`;
        this.con.query(sql, function(err,result){
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    }
    deleteSpell(filter){
        var sql = 
            `DELETE FROM potterverse.spells WHERE ${filter.field} = '${filter.fieldVal}'`;
        this.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        });
    }
    closeConnection(){
        this.con.end(function(err){
            if (err) console.error(err);
            else console.log("sql connection closed");
        });
    }
}