const {MongoClient} = require('mongodb');

module.exports = class CRUD {
    constructor(){
        this.uri = 'mongodb://localhost:27017/potterverse'
        this.client = undefined;
        this.collection = undefined;
    }
    connectDB(){
        this.client = new MongoClient(this.uri, 
                                    { useNewUrlParser:true, useUnifiedTopology: true });
    
        this.client.connect(err => {
            if (!err) console.log("client created");
        });
    }

    insertHat(document){
        this.client.db("potterverse").collection("hat").insertOne(document, 
            function(err,result){
            if (err) console.error(err);
            else console.log(`Inserted ${result.insertedId}`);
        });
    }
    insertSpells(documents){
        this.client.db("potterverse").collection("spells").insertMany(documents, 
            function(err,result){
                if (err); //console.error(err);
                else console.log(`Inserted ${result.insertedCount} documents`);
            })
    }
    async readSpells(query,limit = 1){
        const cursor = await this.client.db("potterverse").collection('spells')
            .find(query)
            .limit(limit);
        const results = await cursor.toArray();
        setTimeout(() => {
            results.forEach((result) => {
                console.log(`spell name: ${result.spell}`);
            })
        }, 1000);
    }
    async updateSpells(filter, update){
        const result = await this.client.db('potterverse').collection('spells')
            .updateOne(filter, { $set: update });
        console.log(`${result.matchedCount} document(s) matched the query criteria`);
        console.log(`${result.modifiedCount} document(s) updated`);
    }
    async deleteSpell(filter){
        const result = await this.client.db('potterverse').collection('spells')
                        .deleteOne(filter)
        console.log(`${result.deletedCount} document deleted`);

    }
    closeConnection(){
        console.log("closing connection...");
        this.client.close(err => {
            if (err) console.error(err); 
            else console.log("closed");
        });
    }

}