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
      res.status(404).json({ message: 'Could not find member with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get member' });
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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Members.findBy({ username })
    .first()
    .then(user => {
      if (username && password ) { 
        res.status(200).json({
          message: `Welcome ${user.first_name}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
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
      res.status(404).json({ message: 'Could not find member with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update member' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Members.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find member with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete member' });
  });
});

router.get('/:id/status', (req, res) => {
  const { id } = req.params;

  Members.findStatus(id)
  .then(status => {
    res.json(status);
  })
  .catch(err => {
    res.status(500).json({ message: 'failed to get status' })
  })
});

module.exports = router;