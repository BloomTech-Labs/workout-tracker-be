const exerciseRecords = require('./exerciseRecords-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the exerciseRecords model', () => {

  beforeEach(async () => {
    await db.raw('TRUNCATE "exercise_records" RESTART IDENTITY CASCADE;');
  })

  describe('The get model', () => {

    it('find should return status code 200', async () => {
      const res = await request(server).get('api/exerciseRecords')

      expect(res.status).toBe(200)
    })

    it('find should return an objct', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const exerciseRecord = await exerciseRecords
        .add(data);
      const res = await request(server).get('api/exerciseRecords')

      expect(res.length).toBe(1)
    })

    it('findByID should return status code 200', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const exerciseRecord = await exerciseRecords
        .add(data);
      const res = await request(server).get('api/exerciseRecords/1')

      expect(res.status).toBe(200)
    })

    it('findById should return an objct', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const exerciseRecord = await exerciseRecords
        .add(data);
      const res = await request(server).get('api/exerciseRecords/1')

      expect(res.length).toBe(1)
    })

  })

  describe('The add model', () => {

    it('Add should return status code 200', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const res = await exerciseRecords
        .add(data);

      expect(res.status).toBe(200)
    })

    it('Add should return status code 200', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const res = await exerciseRecords
        .add(data);

      expect(res.length).toBe(1)
    })
  })

  describe('The update model', () => {

    it('update should return 200 status', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const res = await exerciseRecords
        .add(data);
        const data = {
          routine_id: 1,
          routine_record_id: 1,
          sets: 2,
          reps: 2
        };
      const res = await exerciseRecords
        .update(1, updateData)


      expect(res.status).toBe(200)
    })

    it('update should return an object', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const res = await exerciseRecords
        .add(data);
        const data = {
          routine_id: 1,
          routine_record_id: 1,
          sets: 2,
          reps: 2
        };
      const res = await exerciseRecords
        .update(1, updateData)


      expect(res.length).toBe(1)
    })
  })

  describe('The delete model', () => {

    it('remove should return 200 status', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const res = await exerciseRecords
        .add(data);
      const remove = await exerciseRecords
        .remove(1)


      expect(res.status).toBe(200)
    })

    it('remove should return an object', async () => {
      const data = {
        routine_id: 1,
        routine_record_id: 1,
        sets: 1,
        reps: 1
      };
      const res = await exerciseRecords
        .add(data);
      const res = await exerciseRecords
        .remove(1)

      expect(res.length).toBe(1)
    })
  })
})