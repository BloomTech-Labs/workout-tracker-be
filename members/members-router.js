const express = require('express');

const Members = require('./members-model')

const router = express.Router();

router.get('/', (req, res) => {
    Members.find()
  .then(Members => {
    res.json(Members);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get members' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Members.findBydId(id)
  .then(Members => {

    if (Members) {
      res.json(Members);
    } else {
      res.status(404).json({ message: 'Could not find members with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get members' });
  });
});

router.post('/', (req, res) => {
  const memberData = req.body;

  Members.add(memberData)
  .then(newmember => {
    res.status(201).json(newmember);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new member' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Members.update(id, changes)
  .then(members => {
    if (members) {
      res.json({ update: members });
    } else {
      res.status(404).json({ message: 'Could not find members with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update members' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Members.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find members with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete members' });
  });
});

module.exports = router;