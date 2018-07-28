const express = require("express");
const router = express.Router();

//@Route    GET /api/posts/test
//@Desc     tests posts route
//@Access   public
router.get("/test", (req, res) => {
  res.send("hello from posts");
});

module.exports = router;
