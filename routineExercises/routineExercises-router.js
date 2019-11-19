const express = require('express');

const RoutinesExercises = require('./routineExercises-model');

const router = express.Router();

router.get('/', (req, res) => {
    RoutinesExercises.find()
        .then(routines => {
            res.json(routines);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get exercise routines'
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    RoutinesExercises.findById(id)
        .then(routine => {
            
            if (routine) {
                res.json(routine)
            } else {
                res.status(404).json({
                    message: 'Could not find exercise tied to routine with given exercise routine id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get exercise routine'
            });
        });
});

router.post('/', (req, res) => {
    const routineData = req.body;

    RoutinesExercises.add(routineData)
        .then(newRoutine => {
            res.status(201).json(newRoutine)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new exercise routine'
            });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    RoutinesExercises.update(id, changes)
        .then(exercise => {
            if (exercise) {
                res.json({
                    update: exercise
                });
            } else {
                res.status(404).json({
                    message: 'Could not find the exercise tied to routine entry with the same id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'faild to update routine exercise entry'
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    RoutinesExercises.remove(id)
        .then(count => {
            if (count) {
                res.json({
                    removed: count
                })
            } else {
                res.status(404).json({
                    message: 'Could not find routine exercise entry with the given id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to delete routine exercise entry'
            })
        })
})

module.exports = router;