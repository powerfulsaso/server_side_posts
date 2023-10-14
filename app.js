

const express = require("express");
const app = express();

require("./config/db.config");

const router = require("./config/router.config");
app.use(router);

app.listen(8000, () => {
    console.log('server listening on port 8000!');
});

module.exports = app;

//Create
//POST / api / posts, 201, 400, {}
    
//Read
//GET / api / posts, 200, []
//GET /api/posts/:id, 200, 404, {}

//Update
//PUT /api/posts/:id, 200, 400, 404, {}
//PATCH /api/posts/:id, 200, 400, 404, {}

