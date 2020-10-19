const express = require('express');
const controller = require('../controller/controller.js');

router = express.Router();

//Projects API
router.route('/updateLogin').get(controller.updateLogin);
router.route('/addProject').get(controller.addProject);
router.route('/deleteProject').get(controller.deleteProject);
router.route('/updateProject').get(controller.updateProject);
router.route('/getProjects').get(controller.getProjects);

//TODO API
router.route('/fetchToDos').get(controller.fetchToDos);
router.route('/updateTodo').get(controller.updateTodo);
router.route('/deleteTodo').get(controller.deleteTodo);
router.route('/addToDo').get(controller.addTodo)

//Login API
router.route('/registerUser').get(controller.registerUser)
router.route('/checkLogin').post(controller.checkLogin)


module.exports = router;
