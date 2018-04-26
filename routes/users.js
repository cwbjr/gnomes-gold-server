const express = require('express');
const router = express.Router();
const queries = require('../queries');

router.get('/', (req, res, next) => {
  queries.list()
    .then(users => {
      res.json({ users });
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  queries.read(req.params.id)
    .then(user => {
      user ? res.json({ user }) : res.status(404).json({ message: 'Not found' });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  queries.create(req.body)
    .then(user => {
      res.status(201).json({ user: user });
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  queries.delete(req.params.id)
    .then(() => {
      res.sendStatus(204).json({ deleted: true });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  queries.update(req.params.id, req.body)
    .then(user => {
      res.json({ user: user[0] });
    })
    .catch(next);
});

module.exports = router;
