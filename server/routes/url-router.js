const express = require("express");

const URLCtrl = require("../controllers/url-ctrl");
const router = express.Router();

router.post("/url", URLCtrl.createURL);
router.delete("/url/:id", URLCtrl.deleteURL);
router.get("/urls", URLCtrl.getURLs);

module.exports = router;
