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

module.exports = router;