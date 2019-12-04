const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

const MembersRouter = require('../routes/members/members-router')
const MemberStatusRouter = require('../routes/membersStatus/memberStatus-router')
const routinesRouter = require('../routes/routines/routines-router');
const routinesExercisesRouter = require('../routes/routineExercises/routineExercises-router')
const authRouter = require('../routes/auth')

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/members', MembersRouter);
server.use('/api/memberstatus', MemberStatusRouter);
server.use('/api/routines', routinesRouter);
server.use('/api/routinesexercises', routinesExercisesRouter);
server.use('/api/auth', authRouter)
server.use(express.static(__dirname + '/../client/build/'));

server.get('/', (req, res) => {
    res.send("I guess it's working!")
});

module.exports = server;