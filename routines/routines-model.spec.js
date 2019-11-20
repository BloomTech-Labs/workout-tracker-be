const Routines = require('./routines-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the routines model', () => {

    beforeEach(async () => {
        await db('routines').truncate();
    })

    describe('The get model', async () => {

        it('should return status code 200', async () => {
            const res = await request(server).get('/api/routines');

            expect(res.status).toBe(200)
        })
    })
})