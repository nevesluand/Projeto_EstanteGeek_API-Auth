// const routes = require("express").Router();
const {Router} = require("express");

const AuthenticationController = require("../controllers/AuthenticationController")

const routes = Router();

routes.get("/login", AuthenticationController.doLogin);
// logout pode ser feito com o client simplesmente 
// deletando o token da memória (cache outro tipo de armazenamento) 
// routes.get("/logout", AuthenticationController.doLogin);

module.exports = routes;
