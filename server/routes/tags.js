const express = require("express");
const { getTagsByState, upVoteTag, createTag } = require("../controllers/tagController");
const router = express.Router();

router.post("/", createTag);
router.get("/:stateCode", getTagsByState);
router.put("/upvote/:tagId", upVoteTag);

module.exports = router;
