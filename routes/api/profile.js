const express = require("express");
const router = express.Router();

//@Route    GET /api/profile/test
//@Desc     tests profile route
//@Access   public
router.get("/test", (req, res) => {
  res.send("hello from profile");
});

module.exports = router;
