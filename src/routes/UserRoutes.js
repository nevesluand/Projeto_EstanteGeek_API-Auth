// const routes = require("express").Router();
const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");

const UserController = require("../controllers/UserController")

const routes = Router();

// o GET /user não vai precisar de autenticação
routes.post("/user", UserController.createUser);
routes.delete("/user/:id", verifyJWT, UserController.deleteUser);
routes.get("/user/:id", verifyJWT, UserController.getUser);
routes.put("/user/:id", verifyJWT, UserController.updateUser);

module.exports = routes;
