const exppress = require("express");
const router = exppress.Router();

//@route  GET api/profile
//@desc   Test route
//@access Public
router.get("/", (req, res) => res.send("User Profile"));

module.exports = router;
