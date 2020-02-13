const Employee = require('./employee')

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email)
        this.title = 'Engineer';
        this.github = "GitHubUser";
    };

    getRole(){
        return this.title
    };

    getGithub(){
        return this.github
    };
};

module.exports = Engineer;