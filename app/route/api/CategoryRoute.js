/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CategoryController = require('../../control/CategoryController');
const categoryController = new CategoryController();

/**
 * Category Entity routes
 */
router.get('/count', function (req, res) {
    categoryController.countAll(res);
});

router.get('/exists/:name', function (req, res) {
    categoryController.exists(req, res);
});

router.get('/:name', function (req, res) {
    categoryController.findById(req, res)
});

router.get('/', function (req, res) {
    categoryController.findAll(res);
});

router.put('/:name', function (req, res) {
    categoryController.update(req, res)
});

router.post('/create', function (req, res) {
    categoryController.create(req, res);
});

router.delete('/:name', function (req, res) {
    categoryController.deleteById(req, res)
});

module.exports = router;
