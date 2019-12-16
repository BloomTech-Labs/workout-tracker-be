const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const server = express();

const passport = require("passport");

const MembersRouter = require("../members/members-router");
const MemberStatusRouter = require("../membersStatus/memberStatus-router");
const routinesRouter = require("../routines/routines-router");
const routinesExercisesRouter = require("../routineExercises/routineExercises-router");
const memberExercises = require("../memberExercises/member-exercises-router")

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use("/api/members", MembersRouter);
server.use("/api/memberstatus", MemberStatusRouter);
server.use("/api/routines", routinesRouter);
server.use("/api/routinesexercises", routinesExercisesRouter);
server.use("/api/memberexercises", memberExercises);
server.use(express.static(__dirname + "/../client/build/"));

server.get("/", (req, res) => {
  res.send("I guess it's working!");
});

module.exports = server;
