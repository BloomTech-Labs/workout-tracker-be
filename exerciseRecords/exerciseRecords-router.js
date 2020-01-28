const express = require('express');

const exerciseRecords = require('./exerciseRecords-model')

const router = express.Router();

router.get('/', (req, res) => {
    exerciseRecords.find()
  .then(exerciseRecords => {
    res.status(200).json(exerciseRecords);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get exercise records' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  exerciseRecords.findBydId(id)
  .then(exerciseRecords => {

    if (exerciseRecords) {
      res.status(200).json(exerciseRecords);
    } else {
      res.status(404).json({ message: 'Could not find the exercise record with that id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get exercise records' });
  });
});

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const memberExerciseData = { routine_id: id, post };

  exerciseRecords.add(memberExerciseData)
  .then(newMemberExercise => {
    res.status(200).json(newMemberExercise);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new exercise record' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  exerciseRecords.update(id, changes)
  .then(exerciseRecords => {
    if (exerciseRecords) {
      res.status(200).json({ update: exerciseRecords });
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

  exerciseRecords.remove(id)
  .then(count => {
    if (count) {
      res.status(200).json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find the exercise record with that id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete the exercise record' });
  });
});

module.exports = router;