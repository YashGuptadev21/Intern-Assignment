const express = require("express");
const router = express.Router();
const { getDataByYear } = require("../controllers/gsdpController");

router.get("/:year", getDataByYear);

module.exports = router;
