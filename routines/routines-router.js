const express = require('express');

const Routines = require('./routines-model');
const RoutineExercises = require('../routineExercises/routineExercises-model');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
    Routines.find()
        .then(routines => {
            res.json(routines);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get routines'
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Routines.findById(id)
        .then(routine => {
            
            if (routine) {
                RoutineExercises.findByRoutine(id)
                    .then(exercises => {
                        const searchRequest = exercises.map(object => object.exercise_id)
                        console.log(searchRequest);
                        // res.send({ routine, exercises: exercises })
                        request.post('http://127.0.0.1:4000/api/exrx/').form({search: searchRequest}).on('response', function(response) {
                            console.log(response.statusCode)
                        })
                        
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find routine with given id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get routine'
            });
        });
});

router.post('/', (req, res) => {
    const routineData = req.body;

    Routines.add(routineData)
        .then(newRoutine => {
            res.status(201).json(newRoutine)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new routine'
            });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Routines.update(id, changes)
        .then(routine => {
            if (routine) {
                res.json({
                    update: routine
                });
            } else {
                res.status(404).json({
                    message: 'Could not find routine with given id'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to update routine'
            });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Routines.remove(id)
        .then(count => {
            if (count) {
                res.json({
                    removed: count
                });
            } else {
                res.status(404).json({
                    message: 'Could not find routine with given id'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to delete routine'
            });
        });
});

module.exports = router;