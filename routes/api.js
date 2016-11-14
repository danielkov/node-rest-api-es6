const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const Todo = require('../models/todo');

router
.get('/', function *(next) {
  let todos;
  try {
    todos = yield Todo.all();
  } catch (e) {
    this.throw(e);
  }
  this.body = todos;
  yield next;
})
.get('/:id', function *(next) {
  let id = this.params.id;
  let todo;
  try {
    todo = yield Todo.findById(id);
  } catch (e) {
    this.throw(e);
  }
  if (todo) {
    this.body = todo;
  }else {
    this.throw(404, 'Not found.')
  }
  yield next;
})
.post('/', bodyParser(), function *(next) {
  let todo = new Todo({
    title: this.request.body.title,
    done: false
  });
  try {
    this.body = yield todo.save()
  } catch (e) {
    this.throw(e);
  }
  yield next;
})
.del('/:id', function *(next) {
  let id = this.params.id;
  let todo;
  try {
    todo = yield Todo.findById(id);
  } catch (e) {
    this.throw(e);
  }
  yield todo.remove();
  this.body = {success: true};
  yield next;
})
.put('/:id', bodyParser(), function *(next) {
  let id = this.params.id;
  let todo;
  try {
    todo = yield Todo.findById(id);
  } catch (e) {
    this.throw(e);
  }
  todo.set('title', this.request.body.title);
  this.body = yield todo.save();
  yield next;
})
.put('/:id/toggle', function *(next) {
  let id =  this.params.id;
  let todo;
  try {
    todo = yield Todo.findById(id);
  } catch (e) {
    this.throw(e);
  }
  todo.set('done', !todo.get('done'));
  this.body = yield todo.save();
  yield next;
})

module.exports = router;
