/* Load Category entity */
const Category = require('../model/Category');

/* Load DAO Common functions */
const daoCommon = require('../dao/daoCommon');

/**
 * Category Data Access Object
 */
class CategoryDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(name) {
        let sqlRequest = "SELECT name, created, modified, todo FROM category WHERE name=$name";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Category(row.name, row.created, row.modified, row.todo));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM category";
        console.log("camehere");
        return this.common.findAll(sqlRequest).then(rows => {
         
            let categories = [];
            for (const row of rows) {
             categories.push(new Category(row.name, row.created, row.modified, row.todo));
           
            }
        
            return categories;
        });
    };


    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM category";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Driver
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Category) {
        let sqlRequest = "UPDATE category SET " +
            "created=$created, " +
            "modified=$modified " +
            "todo=$todo, " +
            "WHERE name=$name";

        let sqlParams = {
            $created: Category.created,
            $modified: Category.modified,
            $todo: Category.todo,
            $name: Category.name
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Category
     * returns database insertion status
     */
    create(Category) {
        let sqlRequest = "INSERT into category (name, created, modified, todo) " +
            "VALUES ($name, $created, $modified, $todo)";
        let sqlParams = {
            $name: Category.name,
            $created: Category.created,
            $modified: Category.modified,
            $todo: Category.todo
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided in the database
     * @params Category
     * returns database insertion status
     */
    createWithId(Category) {
        let sqlRequest = "INSERT into category (name, created, modified, todo) " +
            "VALUES ($name, $created, $modified, $todo)";
        let sqlParams = {
            $name: Category.name,
            $created: Category.created,
            $modified: Category.modified,
            $todo: Category.todo
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(name) {
         
        let sqlParams = {$name: name};
        let sqlRequest = "DELETE FROM category WHERE name=$name";
    
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(name) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM category WHERE name=$name";
        let sqlParams = {$name: name};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = CategoryDao;