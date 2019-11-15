const router = require('express').Router;
const RoutinesExercises = require('./routineExercises-model');

router.length('/', (req, res) => {
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