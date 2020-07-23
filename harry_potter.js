const fetch = require('node-fetch');
const http = require('https');
const Mongo = require('./connection');
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
        hat.sortingHat = response;
    }
    getHouses(){
        const endpoint = this.uri + this.routes['house'] + this.accessKey;
        try {
            http.get(endpoint, function(response){
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
        // create own promise
        // create list of promises
        // async.waterfall
        

    }
    getCharacters(){
        let charObj;
        const endpoint = this.uri + this.routes['characters'] + this.accessKey;
        fetch(endpoint)
            .then(response => response.json())
            .then(response => charObj = response)
            .catch(err => console.log("error occurred"));
        return charObj;
    }
};

potter = new HP();
cur = new Mongo();

potter.getSortingHat();
setTimeout(() => {
    console.log(hat);
},5000)

potter.getHouses();
setTimeout(() => {
    console.log(houses);
},10000)


potter.getSpells();
setTimeout(() => {
    console.log(spells);
}, 150000)



// setTimeout(() => {
//     cur.connectDB();
// },8000)


// setTimeout(() => {
//     cur.insert(hat);
// },10000);


// setTimeout(() => {
//     cur.closeConnection();
// },16000);

