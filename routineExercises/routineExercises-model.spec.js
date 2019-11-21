const RoutineExercises = require('./routineExercises-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the routines model', () => {

    beforeEach(async () => {
        await db('routine_exercises').truncate();
    })

    describe('The get model', () => {

        it('should return status code 200', async () => {
            const res = await request(server).get('/api/routinesexercises');

            expect(res.status).toBe(200)
        })

        it('should return an object', async () => {
            const data = { member_id: 1, routine_id: 1, exercise_date: 1};
            const routine = await RoutineExercises.add(data);
            const get = await RoutineExercises.find();

            expect(get.length).toBe(1);
        })
    })

    describe('The add model', () => {

        it('should return an object', async () => {
            const data = { member_id: 1, routine_id: 1, exercise_date: 1};
            const routine = await RoutineExercises.add(data);

            expect(routine).toEqual({ id: 1, member_id: 1, routine_id: 1, exercise_date: 1 });
        })

        it('should return a status code of 201', async () => {
            const data = { member_id: 1, routine_id: 1, exercise_date: 1};
            const res = await request(server).post('/api/routinesexercises').set('Accept', 'application/json').send(data);

            expect(res.status).toBe(201)
        })
    })
})