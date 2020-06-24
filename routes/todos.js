var express = require('express');
var router = express.Router();
var todosModel = require('../models/todos');

/**
 * A endpoint to show all todo datas 
 * @method GET
 * @returns all todo datas
 * 
 */
router.get('/', function (req, res, next) {
  res.status(200);
  let out = {
    message: "Get contacts",
    data: todosModel.List()
  };
  res.json(out);
});

/**
 * A endpoint to show a specific todo id
 * @method GET
 * @param todo id
 * @returns a todo data with specific id
 * 
 */
router.get('/:id', function (req, res, next) {
  res.status(200);
  let out = {
    message: "Get Contact by id",
    data: todosModel.Detail(req.params.id)
  };
  res.json(out);
});

/**
 * A endpoint to store a todo data
 * @method POST
 * @returns a todo data that just saved
 * 
 */
router.post('/', function (req, res, next) {
  let out = {};
  let inputKey = Object.keys(req.body);
  let schemaKey = ['firstname', 'lastname', 'age', 'photo'];

  let validSchema = inputKey.every(function (c, i, a) {
    return c == schemaKey[i];
  });

  if (!validSchema) {
    out = {message: "Body is invalid!"}
    res.status(400);
  } else {
    res.status(201);
    out = {
      message: "Contact is saved!",
      data: todosModel.Create(req.body)
    };
  }

  res.json(out);
});

/**
 * A endpoint to update todo data with specific todo id
 * @param todo id
 * @param todo data
 * @returns a todo data that just updated
 * 
 */
router.put('/:id', function (req, res, next) {
  let out = {};
  let inputKey = Object.keys(req.body);
  let schemaKey = ['firstname', 'lastname', 'age', 'photo'];

  let validSchema = inputKey.every(function (c, i, a) {
    return c == schemaKey[i];
  });

  if (!validSchema) {
    out = {message: "Body is invalid!"}
    res.status(400);
  } else {
    res.status(201);
    out = {
      message: "Contact is updated!",
      data: todosModel.Update(req.params.id, req.body)
    };
  }
  
  res.json(out);
});

/**
 * A endpoint to remove a todo data with specific todo id
 * @param todo id
 * @returns a message related with remove processing.
 */
router.delete('/:id', function (req, res, next) {
  res.status(200);
  let out = {
    message: "Contact is deleted!",
    data: todosModel.Delete(req.params.id)
  };
  res.json(out);
});

module.exports = router;
