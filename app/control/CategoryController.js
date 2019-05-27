/* Load Category Data Access Object */
const CategoryDao = require('../dao/CategoryDao');

/* Load Controller Common function */
const common = require('../control/common');

/* Load Category entity */
const Category = require('../model/Category');

/**
 * Category Controller
 */
class CategoryController {

    constructor() {
        this.categoryDao = new CategoryDao();
        this.common = new common();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let name = req.params.name;
        this.categoryDao.findById(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.categoryDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {
        this.categoryDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let category = new Category();
        category.name = req.body.name;
        category.created = req.body.created;
        category.modified =req.body.modified;

        return this.categoryDao.update(category)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let category = new Category();
        if (req.body.name) {
            category.name = req.body.name;
        }

        category.created = req.body.created;
        category.modified = req.body.modified;
       

        if (req.body.name) {
            return this.categoryDao.createWithId(name)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.categoryDao.create(category)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let name = req.params.name;

        this.categoryDao.deleteById(name)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let name = req.params.name;

        this.categoryDao.exists(name)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = CategoryController;
