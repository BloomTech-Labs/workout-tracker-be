const express = require('express');

const memberExercises = require('./member-exercises-model')

const router = express.Router();

router.get('/', (req, res) => {
    memberExercises.find()
  .then(memberExercises => {
    res.json(memberExercises);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get exercise records' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  memberExercises.findBydId(id)
  .then(memberExercises => {

    if (memberExercises) {
      res.json(memberExercises);
    } else {
      res.status(404).json({ message: 'Could not find the exercise record with that id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get exercise records' });
  });
});

router.post('/', (req, res) => {
  const memberExerciseData = req.body;

  memberExercises.add(memberExerciseData)
  .then(newMemberExercise => {
    res.status(201).json(newMemberExercise);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new exercise record' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  memberExercises.update(id, changes)
  .then(memberExercises => {
    if (memberExercises) {
      res.json({ update: memberExercises });
    } else {
      res.status(404).json({ message: 'Could not find an exercise record with that id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update the exercise record' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  memberExercises.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find the exercise record with that id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete the exercise record' });
  });
});

module.exports = router;