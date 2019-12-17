const Members = require('./members-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the members model', () => {

    beforeEach(async () => {
        await db.raw('TRUNCATE "member_table" RESTART IDENTITY CASCADE;');
    })

    describe('The get model', () => {

        it('should return status code 200', async () => {
            const res = await request(server).get('/api/members');

            expect(res.status).toBe(200)
        })

        it('should return an object', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
            const members = await Members.add(data);
            const get = await Members.find();

            expect(get.length).toBe(1);
        })
    })

    describe('The add model', () => {

        it('should return an object', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" };
            const members = await Members.add(data);

            expect(members).toEqual({ id: 1, first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" });
        })

        it('should return a status code of 201', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" };
            const res = await request(server).post('/api/members').set('Accept', 'application/json').send(data);

            expect(res.status).toBe(201)
        })
    })
    
    describe('The update model', () => {

        it('should return an object', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" };
            const members = await Members.add(data);
            const updateData = { first_name: "Silva", last_name: "Matheus", email:"matheusqs@gmail.com", username:"heus", password: "654321" };
            const update = await Members.update(1, updateData);

            expect(update).toEqual({ first_name: "Silva", last_name: "Matheus", email:"matheusqs@gmail.com", username:"heus", password: "654321" })
        })

        it('should return a status code of 200', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" };
            const routine = await Routines.add(data);
            const updateData = { first_name: "Silva", last_name: "Matheus", email:"matheusqs@gmail.com", username:"heus", password: "654321" };
            const res = await request(server).put('/api/members/1').set('Accept', 'application/json').send(updateData);

            expect(res.status).toBe(200);
        })
    })

    describe('the delete model', () => {

        it('should return and object', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" };
            const members = await Members.add(data);
            const remove = await Members.remove(1);

            expect(remove).toEqual(1)
        })

        it('should return a status code of 200', async () => {
            const data = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456" };
            const members = await Members.add(data);
            const res = await request(server).delete('/api/members/1');

            expect(res.status).toBe(200);
        })
    })
})