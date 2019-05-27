/**
 * Todo Entity (ES6 Class)
 */

class Todo {
    constructor(subject,status,created,modified,category) {
        this.subject= subject;
        this.status = status;
        this.created = created;
        this.modified = modified;
        this.category = category;
    }
}

module.exports = Todo;