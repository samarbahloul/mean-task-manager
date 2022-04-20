
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const cors = require('cors');
//Load in mongoose models 
const { List, Task } = require('./db/models');
//Load midelware
app.use(bodyParser.json());

//cors header midelware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Route Handlers

//List Routes

//Get all Lists
app.get('/lists', (req, res) => {
    //return an array of all lists in th DB
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})


//create list
app.post('/lists', (req, res) => {
    //create a new list and return back to the user include the id
    let title = req.body.title;
    let newList = new List({
        title
    })
    newList.save().then((listDoc) => {
        //the full list is returned include the id
        res.send(listDoc);
    })
});

//update a specified list
app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200); //successful result
    });

});


//delete a list
app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removeListDoc) => {
        res.send(removeListDoc);
    })
});

//get all tasks to a specific list specified by id
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })

});

//get a specific task
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })

});

//create a new task in a list
app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }
    ).then(() => {
        res.sendStatus(200);
    })
});

//delete a task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findByIdAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});


app.listen(3000, () => {
    console.log("server is listening on port 3000");
})