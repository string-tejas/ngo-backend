const router = require("express").Router();

router.route("/admin").get().post().patch().delete();

router.route("/volunteer").get().post().patch().delete();

router.route("/institute").get().post().patch().delete();
