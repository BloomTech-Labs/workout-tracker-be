const memberRoutineRecords = require('./memberRoutineRecords-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');
const Routines = require('../routines/routines-model');
const Members = require('../members/members-model');

describe('the memberRoutineRecords model', () => {

  beforeEach(async () => {
    await db.raw('TRUNCATE "member_routine_records" RESTART IDENTITY CASCADE;');
    await db.raw('TRUNCATE "member_table" RESTART IDENTITY CASCADE;');
    await db.raw('TRUNCATE "routines" RESTART IDENTITY CASCADE;');
  })

  describe('The get model', () => {

    it('find should return status code 200', async () => {
      const res = await request(server).get('/api/memberRoutineRecords')

      expect(res.status).toBe(200)
    })

    it('find should return an objct', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);
      const get = await memberRoutineRecords.find();

      expect(get.length).toBe(1)
    })

    it('findByID should return status code 200', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);
      const res = await request(server).get('/api/memberRoutineRecords/1')

      expect(res.status).toBe(200)
    })

    it('findById should return an object', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);

      const res = await memberRoutineRecords.findBydId(1);

      expect(Object.keys(res).length).toBe(4);
    })

  })

  describe('The add model', () => {

    it('Add should return status code 200', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const res = await request(server).post('/api/memberRoutineRecords').set('Accept', 'application/json').send(data);


      expect(res.status).toBe(200)
    })

    it('Add should return an object', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const res = await memberRoutineRecords.add(data);

      expect(Object.keys(res).length).toBe(4);
    })

  })

  describe('The update model', () => {

    it('update should return 200 status', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);

      const updateData = { member_id: 1, routine_id: 2 };
      const routineTwo = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutineTow = await Routines.add(routineTwo);
      const res = await request(server).put('/api/memberRoutineRecords/1').set('Accept', 'application/json').send(updateData);


      expect(res.status).toBe(200)
    })

    it('update should return an object', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);

      const updateData = { member_id: 1, routine_id: 2 };
      const routineTwo = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutineTow = await Routines.add(routineTwo);
      const res = await memberRoutineRecords.update(1, updateData);

      expect(Object.keys(res).length).toBe(4);
    })

  })

  describe('The delete model', () => {

    it('remove should return 200 status', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);

      const res = await request(server).delete('/api/memberRoutineRecords/1');

      expect(res.status).toBe(200)
    })

    it('remove should return an object', async () => {
      const data = { member_id: 1, routine_id: 1 };
      const user = { first_name: "Matheus", last_name: "Silva", email:"matheusqs.arq@gmail.com", username:"heuzin", password: "123456"};
      const routine = { routine_name: "Upper Test Body", routine_description: "Tri's and Bi's" };
      const addRoutine = await Routines.add(routine);
      const addUser = await Members.add(user);
      const addRecord = await memberRoutineRecords.add(data);

      const res = await memberRoutineRecords.remove(1);

      expect(res).toBe(1)
    })
  })
})