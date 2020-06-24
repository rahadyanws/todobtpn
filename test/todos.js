var todosModel = require('../models/todos');
var assert = require('assert');

/* A variable contains dummy data that to setup early for testing purpose */
var dataDummy = {
    todos: [
        {
            id: "52d06bc2-1234-429e-9df9-6694c9e8e29d",
            firstname: "User",
            lastname: "A",
            age: 23,
            photo: "myA.jpg"
        },
        {
            id: "52d06bc2-4321-429e-9df9-6694c9e8e29d",
            firstname: "User",
            lastname: "B",
            age: 20,
            photo: "myB.jpg"
        },
    ]
};

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, '../data.json');

/** 
 * writeFileSync: A synchronously function writes data to a file, replacing the file if it already exists
 * @param path
 * @param data
 * @param option 
 * 
 **/
fs.writeFileSync(filePath, JSON.stringify(dataDummy), { encoding: 'utf8', flag: "w+" });

/** 
 * A unittest to test function get all todos on model
 * Those are some assert to validate todo json schema
 * 
 **/
describe('Model', function () {
    describe('#List()', function () {
        it('should return list of todos', function () {
            let actual = todosModel.List();
            assert.equal(Array.isArray(actual), true);
            assert.equal(Object.keys(actual[0])[0], 'id');
            assert.equal(Object.keys(actual[0])[1], 'firstname');
            assert.equal(Object.keys(actual[0])[2], 'lastname');
            assert.equal(Object.keys(actual[0])[3], 'age');
            assert.equal(Object.keys(actual[0])[4], 'photo');
        });
    });
});

/** 
 * A unittest to test function get todo by id on model
 * This assert to validate todo value.
 * 
 **/
describe('Model', function () {
    describe('#Detail()', function () {
        it('should return a detail list of todos', function () {
            let actual = todosModel.Detail("52d06bc2-1234-429e-9df9-6694c9e8e29d");
            let expected = { id: "52d06bc2-1234-429e-9df9-6694c9e8e29d", firstname: 'User', lastname: 'A', age: 23, photo: 'myA.jpg' };
            assert.deepStrictEqual(actual, expected);
        });
    });
});

/** 
 * A unittest to test function get todo by id on model
 * This assert to validate empty object, if data doesn`t found.
 * 
 **/
describe('Model', function () {
    describe('#Detail()', function () {
        it('should return null object if there is no data founded', function () {
            let actual = todosModel.Detail(3);
            assert.deepStrictEqual(actual, {});
        });
    });
});

/** 
 * A unittest to test function create on model
 * This assert to validate todo value, when store processing has done.
 * 
 **/
describe('Model', function () {
    describe('#Create()', function () {
        it('should return true if store process is success', function () {
            let newtodo = { firstname: 'User', lastname: 'C', age: 19, photo: 'myC.jpg' };
            let actual = todosModel.Create(newtodo);
            newtodo.id = actual.id;
            assert.deepStrictEqual(actual, newtodo);
        });
    });
});

/** 
 * A unittest to test function update on model
 * This assert to validate todo value, when update processing has done.
 * 
 **/
describe('Model', function () {
    describe('#Update()', function () {
        it('should update record', function () {
            let id = "52d06bc2-1234-429e-9df9-6694c9e8e29d";
            let body = { firstname: "User After Update", lastname: "A", age: 23, photo: "myA.jpg" }
            let actual = todosModel.Update(id, body);
            body.id = "52d06bc2-1234-429e-9df9-6694c9e8e29d";
            assert.deepStrictEqual(actual, body);
        });
    });
});

/** 
 * A unittest to test function delete on model
 * This assert to validate message, when delete processing has done.
 * 
 **/
describe('Model', function () {
    describe('#Delete()', function () {
        it('should return true if delete process is success', function () {
            let actual = todosModel.Delete(2);
            assert.equal(actual, "Contact is deleted!");
        });
    });
});