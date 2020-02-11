const express = require('express');

const memberRoutineRecords = require('./memberRoutineRecords-model')

const router = express.Router();

router.get('/', (req, res) => {
    memberRoutineRecords.find()
  .then(memberRoutineRecords => {
    res.status(200).json(memberRoutineRecords);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get exercise records' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  memberRoutineRecords.findBydId(id)
  .then(memberRoutineRecords => {

    if (memberRoutineRecords) {
      res.status(200).json(memberRoutineRecords);
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

  memberRoutineRecords.add(memberExerciseData)
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

  memberRoutineRecords.update(id, changes)
  .then(memberRoutineRecords => {
    if (memberRoutineRecords) {
      res.status(200).json({ update: memberRoutineRecords });
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

  memberRoutineRecords.remove(id)
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