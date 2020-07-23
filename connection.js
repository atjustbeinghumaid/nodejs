const {MongoClient} = require('mongodb');
// MongoClient.connect(uri, function(err, db){
//     if (err) throw err;
//     db.createCollection("potterverse", function(err, result){
//         if(err) throw err;
//         console.log("potterverse created");
//         db.close();
//     })
// })
module.exports = class CRUD {
    constructor(){
        this.uri = 'mongodb://localhost:27017/'
        this.client = undefined;
        this.collection = undefined;
    }
    connectDB(){
        this.client = new MongoClient(this.uri, 
                                    { useNewUrlParser:true, useUnifiedTopology: true });
    
        this.client.connect(err => {
            if (!err) console.log("client created");
            this.client.db("hp").createCollection("potterverse");;
        });
    }

    insert(document){
        console.log(document);
        this.client.db("hp").collection("potterverse").insertOne(document, function(err,result){
            if (err) console.error(err);
            else console.log(`Inserted ${result.insertedId}`);
        });
        // setTimeout(() => {
            
        // },3000);
    }
    async closeConnection(){
        try{
            console.log("closing connection");
            this.client.close();
        }
        catch (e) {
            console.error(e);
        }
    }

}