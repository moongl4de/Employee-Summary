const Employee = require('./employee')

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email)
        this.title = 'Manager';
        this.officeNumber = officeNumber
    };

    getOfficeNumber(){
        return this.officeNumber
    };
    
    getRole(){
        return this.title
    };
};

module.exports = Manager;