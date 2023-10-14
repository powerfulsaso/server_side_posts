const mongoose = require('mongoose');
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

MongoMemoryServer.create()
    .then((mongoServer) => {
        return mongoose.connect(mongoServer.getUri(), {
            //useCreateIndex: true,
            //useNewUrlParse: true,
            useUnifiedTopology: true,
            dbName: "server_side_posts",
        })
    })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.log('Error connecting to mongo', err));