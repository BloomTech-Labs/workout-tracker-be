const router = require('express').Router;
const Routines = require('./routines-model');

router.get('/', (req, res) => {
    Routines.findRoutine()
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

    Routines.findRoutineById(id)
        .then(routine => {
            
            if (routine) {
                res.json(routine)
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

    Routines.addRoutine(routineData)
        .then(newRoutine => {
            res.status(201).json(newRoutine)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new routine'
            });
        });
});



module.exports = router;