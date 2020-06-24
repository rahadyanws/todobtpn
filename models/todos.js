const { json } = require('express');
const { v4: uuidv4 } = require('uuid');

/** 
 * readFileSync: A synchronously function reads the entire contents of a file.
 * @param path
 * @param data
 * @param option
 *  
 **/
function readFile() {
    let fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, '../data.json');

    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
}

/** 
 * writeFileSync: A synchronously function writes data to a file, replacing the file if it already exists.
 * @param path
 * @param data
 * @param option
 *  
 **/
function writeFile(params) {
    let fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, '../data.json');

    fs.writeFileSync(filePath, JSON.stringify(params), { encoding: 'utf8', flag: "w+" });
}

const Todos = {
    /**
     * A function to get all todos data on file
     * @returns an array of todos
     * 
     **/
    List: function () {
        let data = readFile();
        return data.todos;
    },

    /**
     * A function to get todo data by id on file
     * @params todo id
     * @returns an object of todo
     * 
     **/
    Detail: function (id) {
        let data = readFile();
        let todoData = data.todos.filter(function (c, i, a) {
            return c.id == id;
        });
        return todoData.length === 0 ? {} : todoData[0];
    },

    /**
     * A function to store todo data into file
     * @params an object todo
     * @returns an object of todo
     * 
     **/
    Create: function (todo) {
        let data = readFile();
        todo.id = uuidv4();
        data.todos.push(todo);
        writeFile(data);
        return todo;
    },

    /**
     * A function to store todo data into file
     * @params todo id
     * @params an object todo
     * @returns an object of todo
     * 
     **/
    Update: function (id, todo) {
        let data = readFile();
        let todos = data.todos;
        let updateIdx = todos.findIndex(function (c, i, a) {
            return c.id == id;
        });
        todos[updateIdx].id = id;
        todos[updateIdx].firstname = todo.firstname;
        todos[updateIdx].lastname = todo.lastname;
        todos[updateIdx].age = todo.age;
        todos[updateIdx].photo = todo.photo;
        writeFile(data);
        return todos[updateIdx];
    },

    /**
     * A function to delete todo data on file
     * @params todo id
     * @returns a message
     * 
     **/
    Delete: function (id) {
        let data = readFile();
        let todoData = data.todos.filter(function (c, i, a) {
            return c.id != id;
        });
        data.todos = todoData;
        writeFile(data);
        return "Contact is deleted!"
    }
}

module.exports = Todos;