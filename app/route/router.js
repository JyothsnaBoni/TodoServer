/**
 * Express Router configuration
 */


const express = require('express');
const router = express.Router();

var cors = require('cors');
router.use(cors()) ;

/* API routes */
router.use('/Todo', require('./api/TodoRoute'));
//console.log("/TODO passed");
router.use('/Category', require('./api/CategoryRoute'));
//console.log("/category passed");
module.exports = router;  