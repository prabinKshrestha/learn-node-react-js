import express from 'express';

var app = express();

app.set("view engine", "ejs");

app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/todo-list', function (req, res) {
    res.render('todo-list');
});

app.get('/add-todo', function (req, res) {
    res.render('add-todo');
});

app.listen(3000);