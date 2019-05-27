/* Load Todo Data Access Object */
const TodoDao = require('../dao/TodoDao');

/* Load Control Common function */
const common = require('../control/common');

/* Load Todo entity */
const Todo = require('../model/Todo');

/**
 * Todo Controller
 */
class TodoController {

    constructor() {
        this.todoDao = new TodoDao();
        this.common = new common();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let subject = req.params.subject;

        this.todoDao.findById(subject)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.todoDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.todoDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {

        var input;
        input = req.params.subject;
 
              return this.todoDao.update(input)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
  
       // console.log("final level");
        let todo = new Todo();
      
        if (req.body.subject) {
            todo.subject = req.body.subject;
            
        }

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
        todo.subject = req.body.subject;
        todo.status= req.body.status;
        todo.created = dateTime;
        todo.modified = "---";
        todo.category = req.body.category;

        if (req.body.subject) {
            return this.todoDao.createWithId(todo)
                .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
        }
        else {
            return this.todoDao.create(todo)
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
        
        var input;
        input = req.params.subject;
    
        this.todoDao.deleteById(input)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let subject = req.params.subject;

        this.todoDao.exists(subject)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = TodoController;