const memberExercises = require('./member-exercises-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the memberExercises model', () => {

  beforeEach(async () => {
    await db.raw('TRUNCATE "member_exercises" RESTART IDENTITY CASCADE;');
  })

  describe('The get model', () => {

    it('Get should return 200 status', async () => {
      const res = await request(server).get('api/memberexercises')

      expect(res.status).toBe(200)
    })

    
  })
})