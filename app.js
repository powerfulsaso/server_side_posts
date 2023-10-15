

const express = require("express");
const app = express();

require("./config/db.config");

app.use(express.json());

const router = require("./config/router.config");
app.use(router);


app.listen(8000, () => {
    console.log('server listening on port 8000!');
});

module.exports = app;
