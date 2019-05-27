/* Load Modules */
const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

/* Load controller */
const TodoController = require('../../control/TodoController');
const categoryController = require('../../control/CategoryController');
const todoController = new TodoController();

/**
 * Todo Entity routes
 */
router.get('/count', function (req, res) {
    todoController.countAll(res);
});

router.get('/exists/:subject', function (req, res) {
    todoController.exists(req, res);
});

router.get('/:subject', function (req, res) {
    todoController.findById(req, res);
});

router.get('/', function (req, res) {
    todoController.findAll(res);
    //res.json({msg:'this is cors-enabled for all origins '});
    
});

router.put('/:subject', function (req, res) {
    todoController.update(req, res);
});


router.post('/create', function (req, res) {

    console.log("Todo routed to create");

    todoController.create(req, res);
   
});

router.delete('/:subject', function (req, res) {
    console.log("delete route passed");
    todoController.deleteById(req, res);
});

module.exports = router;