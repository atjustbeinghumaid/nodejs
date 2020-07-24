const fetch = require('node-fetch');
const https = require('https');
const async = require('async');
const Mongo = require('./connection');
const  Sql = require('./sqlconnection');

var hat = {};
var houses = [];
var spells = [];



class HP {
    constructor(){
        this.uri = 'https://www.potterapi.com/v1/';
        this.routes = {
            characters: 'characters',
            sortingHat: 'sortingHat',
            spells: 'spells',
            house: 'houses'
        }
        this.accessKey = '?key=$2a$10$I65dGwJLa8QnuCYX1ejDUeVdpXW4opVdpiOIfGiLVB.hP2wFvdcGO';
    }
    async getSortingHat(){
        var response;
        const endpoint = this.uri + this.routes['sortingHat'];
        try{
            response = await fetch(endpoint);
            response = await response.text();
        } 
        catch (e) {
            console.error(e);
        }
        finally{
            
            hat.sortingHat = response;
            return Promise.resolve(hat);
            //resolve(hat);
        }
    }
    getHouses(){
        const endpoint = this.uri + this.routes['house'] + this.accessKey;
        try {
            https.get(endpoint, function(response){
                var str = '';

                response.on('data', function (chunk) {
                    str += chunk; 
                });

                response.on("end", () => {
                    houses = JSON.parse(str);
                });
            });
        }
        catch (e) {console.error(e);}

    }
    getSpells(){
        const endpoint = this.uri + this.routes['spells'] + this.accessKey;
        fetch(endpoint)
            .then(response => response.json())
            .then(response => spells = response)
            .catch(err => console.error(err));
    }
    getCharacters(){
        const endpoint = 
        'https://www.potterapi.com/v1/characters?key=$2a$10$I65dGwJLa8QnuCYX1ejDUeVdpXW4opVdpiOIfGiLVB.hP2wFvdcGO';

        let characters = {};

        let promise = new Promise(function(resolve,reject){
            https.get(endpoint, function(response){
                var str = '';
                
                response.on('data', function(chunk){
                str += chunk;
                })
                
                response.on('end', function(){
                characters = JSON.parse(str);
                resolve(characters);
                })
                
            }).on('error', e => {reject(e);});
        })
        return promise;
    }
};

potter = new HP();


potter.getCharacters().then(res => console.log(res.length + " characters fetched")).catch(e => {console.error(e)});


potter.getSortingHat().then(res => console.log(res));

potter.getHouses();
setTimeout(() => {
    console.log(houses.length + " houses fetched");
},7000)


potter.getSpells();
setTimeout(() => {
    console.log(Object.keys(spells).length + " spells fetched");
}, 10000)


// setTimeout(() => {
//     let connectDB = cur.connectDB.bind(cur);
//     let insertHat = cur.insertHat.bind(cur, hat)
//     let insertSpells = cur.insertSpells.bind(cur, spells);
//     let closeConnection = cur.closeConnection.bind(cur);
//     async.series([
//         connectDB, 
//         insertHat, 
//         insertSpells, 
//         closeConnection],
//         function(err){
//             if (err) console.error(err);
//         })
// }, 20000)


cur = new Mongo();
//OPEN CONNECTION
setTimeout(() => {
    cur.connectDB();
},15000)


//CREATE
setTimeout(() => {
    cur.insertSpells(spells);
},20000);

setTimeout(() => {
    cur.insertHat(hat);
},25000);

//READ, UPDATE, DELETE
setTimeout(() => {
    cur
    .readSpells({spell: 'Accio'})
    .then(() => { cur.updateSpells({spell: 'Aberto'}, {spell: 'Leviosa'}); })
    .then(() => { cur.deleteSpell({spell: 'Leviosa'}) ;});
}, 32000)



// CLOSE CONNECTION
setTimeout(() => {
    cur.closeConnection();
},37000);


// setTimeout(() => {
//     let sql = new Sql();
//     let connectDB = sql.connectDB.bind(sql,callback);
//     let insertSpells = sql.insertSpells.bind(sql, callback, [spells[0]._id, spells[0].spell, spells[0].type, spells[0].effect]);
//     let readSpells = sql.readSpells.bind(sql, callback);
//     let updateSpell = sql.updateSpell.bind(sql,{setfield: 'spell', setfieldVal: 'Leviosa', field: 'spell', fieldVal: 'Aberto'});
//     let deleteSpell = sql.deleteSpell.bind(sql, {field: 'spell', fieldVal: 'Leviosa'});
//     let closeConnection = sql.closeConnection.bind(sql);
//     async.series([
//         connectDB,
//         insertSpells,
//         readSpells,
//         updateSpell,
//         deleteSpell,
//         closeConnection
//     ],
//         function(err){
//             if (err) console.error(err);
//         })
// }, 12000)



let sql;

setTimeout(() => {
    sql = new Sql();
    sql.connectDB();
},40000);

setTimeout(() => {
    sql.insertSpells([spells[0]._id, spells[0].spell, spells[0].type, spells[0].effect]);
}, 43000);

setTimeout(() => {
    sql.readSpells();
}, 48000);

setTimeout(() => {
    sql.updateSpell({setfield: 'spell', setfieldVal: 'Leviosa', field: 'spell', fieldVal: 'Aberto'});
}, 53000);

setTimeout(() => {
    sql.deleteSpell({
        field: 'spell', 
        fieldVal: 'Leviosa'
    });
}, 56000);

setTimeout(() => {
    sql.closeConnection();
},60000);