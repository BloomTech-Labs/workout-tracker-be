const Routines = require('./routines-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the routines model', () => {

    beforeEach(async () => {
        await db.raw('TRUNCATE "routines" RESTART IDENTITY CASCADE;');
        // await db('routines').truncate(); //Only works for SQLite3. The above code is for Postgres
    })

    describe('The get model', () => {

        it('Find should return status code 200', async () => {
            const res = await request(server).get('/api/routines');

            expect(res.status).toBe(200)
        })

        it('Find should return an object', async () => {
            const data = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
            const routine = await Routines.add(data);
            const get = await Routines.find();

            expect(get.length).toBe(1);
        })

        it('FindById should return status code 200', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine = await Routines.add(data);
            const res = await request(server).get('/api/routines/1');

            expect(res.status).toBe(200)
        })

        it('FindById should return an object', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's" };
            const routine = await Routines.add(data);
            const get = await Routines.findById(1);

            expect(get).toEqual({ id: 1, routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null })
        })
    })

    describe('The add model', () => {

        it('should return an object', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null };
            const routine = await Routines.add(data);

            expect(routine).toEqual({ id: 1, routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null });
        })

        it('should return a status code of 201', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null };
            const res = await request(server).post('/api/routines').set('Accept', 'application/json').send(data);

            expect(res.status).toBe(201)
        })
    })

    describe('The update model', () => {

        it('should return an object', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null };
            const routine = await Routines.add(data);
            const updateData = { routine_name: "Lower Body", routine_description: "Quads and Calfs", member_id: null };
            const update = await Routines.update(1, updateData);

            expect(update).toEqual({ id: 1, routine_name: "Lower Body", routine_description: "Quads and Calfs", member_id: null })
        })

        it('should return a status code of 200', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null };
            const routine = await Routines.add(data);
            const updateData = { routine_name: "Lower Body", routine_description: "Quads and Calfs", member_id: null };
            const res = await request(server).put('/api/routines/1').set('Accept', 'application/json').send(updateData);

            expect(res.status).toBe(200);
        })
    })

    describe('the delete model', () => {

        it('should return and object', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null };
            const routine = await Routines.add(data);
            const remove = await Routines.remove(1);

            expect(remove).toEqual(1)
        })

        it('should return a status code of 200', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: null };
            const routine = await Routines.add(data);
            const res = await request(server).delete('/api/routines/1');

            expect(res.status).toBe(200);
        })
    })
})