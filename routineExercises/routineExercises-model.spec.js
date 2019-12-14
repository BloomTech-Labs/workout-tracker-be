const RoutineExercises = require('./routineExercises-model');
const Routines = require('../routines/routines-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the routineExercises model', () => {

    beforeEach(async () => {
        await db.raw('TRUNCATE "routine_exercises" RESTART IDENTITY CASCADE;');
        await db.raw('TRUNCATE "routines" RESTART IDENTITY CASCADE;'); //Needed in order to add test data to the routines table otherwise the tests will fail with a foreign key restraint error.
        // await db('routine_exercises').truncate(); //Only works for SQLite3. The above code is for Postgres
    })

    describe('The get model', () => {

        it('Find should return status code 200', async () => {
            const res = await request(server).get('/api/routinesexercises');

            expect(res.status).toBe(200)
        })

        it('Find should return an object', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const get = await RoutineExercises.find();

            expect(get.length).toBe(1);
        })

        it('FindById should return status code 200', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const res = await request(server).get('/api/routinesexercises/1');

            expect(res.status).toBe(200)
        })

        it('FindById should return an object', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const get = await RoutineExercises.findById(1);

            expect(get).toEqual({ "id": 1, "exercise_id": 1, "routine_id": 1})
        })
    })

    describe('The add model', () => {

        it('should return an object', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);

            expect(routine).toEqual({ id: 1, exercise_id: 1, routine_id: 1 });
        })

        it('should return a status code of 201', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const res = await request(server).post('/api/routinesexercises').set('Accept', 'application/json').send(data);

            expect(res.status).toBe(201)
        })
    })

    describe('The update model', () => {

        it('should return an object', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const updateData = { exercise_id: 2, routine_id: 1 };
            const update = await RoutineExercises.update(1, updateData);

            expect(update).toEqual({ id: 1, exercise_id: 2, routine_id: 1 })
        })

        it('should return a status code of 200', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const updateData = { exercise_id: 2, routine_id: 1 };
            const res = await request(server).put('/api/routinesexercises/1').set('Accept', 'application/json').send(updateData);

            expect(res.status).toBe(200);
        })
    })

    describe('the delete model', () => {

        it('should return and object', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const remove = await RoutineExercises.remove(1);

            expect(remove).toEqual(1)
        })

        it('should return a status code of 200', async () => {
            const rdata = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine_one = await Routines.add(rdata);
            const data = { exercise_id: 1, routine_id: 1 };
            const routine = await RoutineExercises.add(data);
            const res = await request(server).delete('/api/routinesexercises/1');

            expect(res.status).toBe(200);
        })
    })
})