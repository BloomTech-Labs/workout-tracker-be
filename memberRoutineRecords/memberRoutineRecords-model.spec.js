const memberRoutineRecords = require('./memberRoutineRecords-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the memberRoutineRecords model', () => {

  beforeEach(async () => {
    await db.raw('TRUNCATE "member_routine_records" RESTART IDENTITY CASCADE;');
  })

  describe('The get model', () => {

    it('find should return status code 200', async () => {
      const res = await request(server).get('api/memberRoutineRecords')

      expect(res.status).toBe(200)
    })

    it('find should return an objct', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const memberRoutineRecord = await memberRoutineRecords
        .add(data);
      const res = await request(server).get('api/memberRoutineRecords')

      expect(res.length).toBe(1)
    })

    it('findByID should return status code 200', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const memberRoutineRecord = await memberRoutineRecords
        .add(data);
      const res = await request(server).get('api/memberRoutineRecords/1')

      expect(res.status).toBe(200)
    })

    it('findById should return an objct', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const memberRoutineRecord = await memberRoutineRecords
        .add(data);
      const res = await request(server).get('api/memberRoutineRecords/1')

      expect(res.length).toBe(1)
    })

  })

  describe('The add model', () => {

    it('Add should return status code 200', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const res = await memberRoutineRecords
        .add(data);

      expect(res.status).toBe(200)
    })

    it('Add should return status code 200', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const res = await memberRoutineRecords
        .add(data);

      expect(res.length).toBe(1)
    })
  })

  describe('The update model', () => {

    it('update should return 200 status', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const res = await memberRoutineRecords
        .add(data);
      const updateData = {
        member_id: 1,
        routine_id: 2
      };
      const res = await memberRoutineRecords
        .update(1, updateData)


      expect(res.status).toBe(200)
    })

    it('update should return an object', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const res = await memberRoutineRecords
        .add(data);
      const updateData = {
        member_id: 1,
        routine_id: 2
      };
      const res = await memberRoutineRecords
        .update(1, updateData)


      expect(res.length).toBe(1)
    })
  })

  describe('The delete model', () => {

    it('remove should return 200 status', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const res = await memberRoutineRecords
        .add(data);
      const remove = await memberRoutineRecords
        .remove(1)


      expect(res.status).toBe(200)
    })

    it('remove should return an object', async () => {
      const data = {
        member_id: 1,
        routine_id: 1
      };
      const res = await memberRoutineRecords
        .add(data);
      const res = await memberRoutineRecords
        .remove(1)

      expect(res.length).toBe(1)
    })
  })
})