/* Load Todo entity */
const Todo = require('../model/Todo');

/* Load DAO Common functions */
const daoCommon = require('../dao/daoCommon');

/**
 * Todo Data Access Object
 */
class TodoDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(subject) {
        let sqlRequest = "SELECT subject, status, created, modified, category FROM todo WHERE subject=$subject";
        let sqlParams = {$subject: subject};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Todo(row.subject, row.status, row.created, row.modified, row.category));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM todo";
        return this.common.findAll(sqlRequest).then(rows => {
            let todos = [];
            for (const row of rows) {
                todos.push(new Todo(row.subject, row.status, row.created, row.modified, row.category));
            }
            return todos;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM todo";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Car
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(input) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        var  updateData = input.split(`-`);

        let sqlParams = {
            $modified : dateTime,
            $categoryold: updateData[1],
            $categorynew: updateData[3],
                     }
            let sqlRequest = `UPDATE category SET modified = $modified 
             where name = $categoryold or name = $categorynew`;
            this.common.run(sqlRequest,sqlParams);

         sqlParams = {
            
           
            $newSubject:  updateData[2],      
            $newStatus:  updateData[4],  
            $newModified: dateTime,
            $newCategory: updateData[3],
            $oldSubject: updateData[0], 
            $oldCategory: updateData[1],
        };

         sqlRequest = `UPDATE todo SET 
            subject = $newSubject,
            status=$newStatus,
            modified=$newModified,  
            category=$newCategory  
            WHERE subject=$oldSubject and category =$oldCategory`;


        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Todo
     * returns database insertion status
     */
    create(Todo) {

        let sqlRequest = `INSERT INTO todo(subject, status, created, modified, category)
        VALUES ($subject, $status, $created , $modified , $category)`;

        let sqlParams = {
            $subject  : Todo.subject,
            $status   : Todo.status,
            $created  : Todo.created,
            $modified : Todo.modified,
            $category : Todo.category
            
        };
        
        
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Todo
     * returns database insertion status
     */
    createWithId(Todo) {


        let sqlRequest = "INSERT into category(name, created, modified) " +
        "VALUES ($name, $created, $modified)";
        console.log("created with subject ");
    let sqlParams = {
        $name: Todo.category,
        $created: Todo.created,
        $modified: Todo.modified
        
    };
    this.common.run(sqlRequest, sqlParams);

        sqlRequest = "INSERT into todo (subject, status, created, modified, category) " +
            "VALUES ($subject, $status, $created, $modified, $category)";
            console.log("created with subject ");
        sqlParams = {
            $subject: Todo.subject,
            $status: Todo.status,
            $created: Todo.created,
            $modified: Todo.modified,
            $category: Todo.category
            
        };
        
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params subject
     * returns database deletion status
     */
    deleteById(input) {
               var  subject = input.split(`-`);
               var today = new Date();
               var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
               var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
               var dateTime = date+' '+time;
         let sqlParams = {
          $modified : dateTime,
          $category: subject[1]
                   }
          let sqlRequest = `UPDATE category SET modified = $modified 
           where name = $category`;
          this.common.run(sqlRequest,sqlParams);

     sqlParams = {
              
            $subject:  subject[0],
           
            $category: subject[1]
             
        };
     
     sqlRequest = "DELETE FROM todo WHERE subject=$subject and category=$category";
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params subject
     * returns database entry existence status (true/false)
     */
    exists(subject) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM todo WHERE subject=$subject";
        let sqlParams = {$subject: subject};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = TodoDao;
