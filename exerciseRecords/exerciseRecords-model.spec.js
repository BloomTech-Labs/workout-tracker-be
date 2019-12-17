const exercisseRecords = require('./exerciseRecords-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the exercisseRecords model', () => {

  beforeEach(async () => {
    await db.raw('TRUNCATE "member_exercises" RESTART IDENTITY CASCADE;');
  })

  describe('The get model', () => {

    it('find should return 200 status', async () => {
      const res = await request(server).get('api/exercisseRecords')

      expect(res.status).toBe(200)
    })

    it('findByID should return 200 status', async() => {
      const data = { member_id: 1, routine_id: 1};
      const member_exercise = await exercisseRecords
    .add(data);
      const res = await request(server).get('api/exercisseRecords/1')

      expect(res.status).toBe(200)
    })


  })

  describe('The add model', () => {

    it('add should return 201 status', async () => {
      const data = { member_id: 1, routine_id: 1};
      const res = await exercisseRecords
    .add(data);
      
      expect(res.status).toBe(201)
    })
  })

  describe('The update model', () => {

    it('update should return 201 status', async () => {
      const data = { member_id: 1, routine_id: 1};
      const res = await exercisseRecords
    .add(data);
      const updateData = { member_id: 1, routine_id: 2};
      const res = await exercisseRecords
    .update(1, updateData)

      
      expect(res.status).toBe(201)
    })
})})
