const exerciseRecords = require('./exerciseRecords-model');
const memberRoutineRecords = require('../memberRoutineRecords/memberRoutineRecords-model');
const Routines = require('../routines/routines-model');
const Members = require('../members/members-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the exerciseRecords model', () => {

  beforeEach(async () => {
    await db.raw('TRUNCATE "exercise_records" RESTART IDENTITY CASCADE;');
    await db.raw('TRUNCATE "member_routine_records" RESTART IDENTITY CASCADE;');
    await db.raw('TRUNCATE "member_table" RESTART IDENTITY CASCADE;');
    await db.raw('TRUNCATE "routines" RESTART IDENTITY CASCADE;');
  })

  describe('The get model', () => {

    it('find should return status code 200', async () => {
      const res = await request(server).get('/api/exerciseRecords')

      expect(res.status).toBe(200)
    })

    it('find should return an objct', async () => {
      const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
      const record = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(record);
      const exerciseRecord = await exerciseRecords.add(data);
      const get = await exerciseRecords.find()

      expect(get.length).toBe(1)
    })

    it('findByID should return status code 200', async () => {
      const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
      const record = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(record);
      const exerciseRecord = await exerciseRecords.add(data);
      const res = await request(server).get('/api/exerciseRecords/1')

      expect(res.status).toBe(200)
    })

    it('findById should return an objct', async () => {
      const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
      const record = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(record);
      const exerciseRecord = await exerciseRecords.add(data);
      const res = await exerciseRecords.findBydId(1);

      expect(Object.keys(res).length).toBe(8)
    })

  })

  describe('The add model', () => {

    it('Add should return status code 200', async () => {
        const data = { routine_id: 1, sets: 1, reps: 1 };
        const record = { member_id: 1, routine_id: 1 };
        const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
        const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
        const addRoutine = await Routines.add(routine);
        const addUser = await Members.add(user);
        const addRecord = await memberRoutineRecords.add(record);
        const res = await request(server).post('/api/exerciseRecords/1').set('Accept', 'application/json').send(data);

      expect(res.status).toBe(200)
    })

    it('Add should return an object', async () => {
        const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
        const record = { member_id: 1, routine_id: 1 };
        const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
        const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
        const addRoutine = await Routines.add(routine);
        const addUser = await Members.add(user);
        const addRecord = await memberRoutineRecords.add(record);
        const res = await exerciseRecords.add(data)

        expect(Object.keys(res).length).toBe(8)
    })
  })

  describe('The update model', () => {

    it('update should return 200 status', async () => {
        const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
        const record = { member_id: 1, routine_id: 1 };
        const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
        const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
        const addRoutine = await Routines.add(routine);
        const addUser = await Members.add(user);
        const addRecord = await memberRoutineRecords.add(record);
        const exerciseRecord = await exerciseRecords.add(data);

        const updateData = { routine_id: 1, routine_record_id: 1, sets: 2, reps: 2 };
        const res = await request(server).put('/api/exerciseRecords/1').set('Accept', 'application/json').send(updateData);


      expect(res.status).toBe(200)
    })

    it('update should return an object', async () => {
        const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
        const record = { member_id: 1, routine_id: 1 };
        const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
        const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
        const addRoutine = await Routines.add(routine);
        const addUser = await Members.add(user);
        const addRecord = await memberRoutineRecords.add(record);
        const exerciseRecord = await exerciseRecords.add(data);

        const updateData = { routine_id: 1, routine_record_id: 1, sets: 2, reps: 2 };
        const res = await exerciseRecords.update(1, updateData)


        expect(Object.keys(res).length).toBe(8)
    })
  })

  describe('The delete model', () => {

    it('remove should return an object', async () => {
        const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
        const record = { member_id: 1, routine_id: 1 };
        const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
        const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
        const addRoutine = await Routines.add(routine);
        const addUser = await Members.add(user);
        const addRecord = await memberRoutineRecords.add(record);
        const exerciseRecord = await exerciseRecords.add(data);

      const remove = await exerciseRecords.remove(1)

      expect(remove).toBe(1)
    })

    it('remove should return a status code of 200', async () => {
        const data = { routine_id: 1, routine_record_id: 1, sets: 1, reps: 1 };
        const record = { member_id: 1, routine_id: 1 };
        const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
        const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
        const addRoutine = await Routines.add(routine);
        const addUser = await Members.add(user);
        const addRecord = await memberRoutineRecords.add(record);
        const exerciseRecord = await exerciseRecords.add(data);

        const res = await request(server).delete('/api/exerciseRecords/1')

      expect(res.status).toBe(200)
    })
  })
})