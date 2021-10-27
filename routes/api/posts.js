const exppress = require('express');
const router = exppress.Router();

//@route  GET api/posts
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router