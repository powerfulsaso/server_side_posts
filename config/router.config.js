const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const middleware = require("../middlewares/secure.middleware");

router.post("/api/posts", middleware.checkAuth, posts.create);
router.get("/api/posts", middleware.checkAuth, posts.list);
router.get("/api/posts/:id", middleware.checkAuth, posts.detail);
router.patch("/api/posts/:id", middleware.checkAuth, posts.update);
router.delete("/api/posts/:id", middleware.checkAuth, posts.delete);

router.post("/api/users", users.create);
router.post("/api/login", users.login);
router.get("/api/users/activate/:id", users.activate);


module.exports = router;