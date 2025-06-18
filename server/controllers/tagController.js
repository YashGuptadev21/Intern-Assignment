  const Tag = require("../models/Tag");

  // Creating a Tag
  const createTag = async (req, res) => {
    try {
      const { state_code, tag_name } = req.body;
      if (!state_code || !tag_name) {
        return res.status(400).json({
          message: "State code and tag name are required",
        });
      }

      const tag = await Tag.create({ state_code, tag_name });
      res.json(tag);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };

// Getting the tag through stateCode
  const getTagsByState = async (req, res) => {
      try {
      const { state_code } = req.params;
      const tags = await Tag.find({ state_code }).sort({ upvotes: -1 });
      res.json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  //Upvoting the tags
  const upVoteTag = async (req, res) => {
    try {
      const { tagId } = req.params;
      const updated = await Tag.findByIdAndUpdate(
        tagId,
        { $inc: { upvotes: 1 } },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Tag not found" });
      }

      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {
    createTag,
    getTagsByState,
    upVoteTag,
  };
