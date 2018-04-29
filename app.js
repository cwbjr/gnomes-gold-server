const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const queries = require('./queries');

// app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

function getUserFromBody(body) {
  const { first_name, last_name, email } = body;
  const user = {
    first_name,
    last_name,
    email
  };
  return user;
}

app.get('/user', (req, res, next) => {
  queries.list()
    .then(users => {
      res.json({ users });
    })
    .catch(next);
});

app.get('/user/:id', (req, res, next) => {
  queries.read(req.params.id)
    .then(user => {
      user ? res.json({ user }) : res.status(404).json({ message: 'Not found' });
    })
    .catch(next);
});

app.post('/user', (req, res, next) => {
  const  user = getUserFromBody(req.body);
  queries.create(user)
    .then(user => {
      res.status(201).json({ user: user });
    })
    .catch(err => next(err));
});

app.delete('/user/:id', (req, res, next) => {
  queries.delete(req.params.id)
    .then(() => {
      res.sendStatus(204).json({ deleted: true });
    })
    .catch(next);
});

app.put('/user/:id', (req, res, next) => {
  queries.update(req.params.id, req.body)
    .then(user => {
      res.json({ user: user[0] });
    })
    .catch(next);
});


// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err.stack : {}
  });
});

module.exports = app;
