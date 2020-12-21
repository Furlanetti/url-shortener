const express = require("express");

const UrlController = require("./controllers/url");
const UrlRepository = require("./repositories/url");

const url = new UrlController(UrlRepository);

const routes = express.Router();

routes.post("/url/", (req, res) => url.post(req, res));
routes.get("/url/:code", (req, res) => url.redirectByCode(req, res));
routes.get("/top/", (req, res) => url.topOneHundred(req, res));

module.exports = routes;
