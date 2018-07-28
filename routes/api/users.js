const express = require("express");
const router = express.Router();

//@Route    GET /api/users/test
//@Desc     tests users route
//@Access   public
router.get("/test", (req, res) => {
  res.send("hello from users");
});

module.exports = router;
