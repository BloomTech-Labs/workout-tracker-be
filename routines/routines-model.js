const db = require('../database/db-config');

module.exports ={
    findRoutine,
    findRoutineById,
    findRoutineExercises,
    findRoutineExerciseById,
    findRoutineExerciseBy,
    addRoutine,
    addExercise,
    removeRoutine,
    removeExercise,
    updateRoutine,
    updateExercise
}

function findRoutine() {
    return db('routines');
}

function findRoutineById(id) {
    return db('routines').where({ id }).first();
}

function addRoutine(data) {
    return db('routines').insert(data)
        .then(newRoutine => {
            return findRoutineById(newRoutine[0]);
        });
}

function removeRoutine(id) {
    return db('routines').where({ id }).del();
}

function updateRoutine(id, changes) {
    return db('routines').where({ id }).update(changes)
        .then(update => {
            return findRoutineById(id);
        })
}

function findRoutineExercises() {
    return db('routine_exercises');
}

function findRoutineExerciseById(id) {
    return db('routine_exercises').where({ id }).first();
}

function findRoutineExerciseBy(filter) {
return db('routine_exercises').where(filter)
}

function addExercise(data) {
    return db('routine_exercises').insert(data)
        .then(newitem => {
            return findRoutineExerciseById(newitem[0]);
        });
}

function removeExercise(id) {
    return db('routine_exercises').where({ id }).del();
}

function updateExercise(id, changes) {
    return db('routine_exercises').where({ id }).update(changes)
        .then(update => {
            return findRoutineExerciseById(id);
        })
}