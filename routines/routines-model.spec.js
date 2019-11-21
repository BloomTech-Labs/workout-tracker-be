const Routines = require('./routines-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the routines model', () => {

    beforeEach(async () => {
        await db('routines').truncate();
    })

    describe('The get model', () => {

        it('should return status code 200', async () => {
            const res = await request(server).get('/api/routines');

            expect(res.status).toBe(200)
        })

        it('should return an object', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: 1};
            const routine = await Routines.add(data);
            const get = await Routines.find();

            expect(get.length).toBe(1);
        })
    })

    describe('THe add model', () => {

        it('should return an object', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: 1 };
            const routine = await Routines.add(data);

            expect(routine).toEqual({ id: 1, routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: 1 });
        })

        it('should return a status code of 201', async () => {
            const data = { routine_name: "Upper Body", routine_description: "Tri's and Bi's", member_id: 1 };
            const res = await request(server).post('/api/routines').set('Accept', 'application/json').send(data);

            expect(res.status).toBe(201)
        })
    })
})