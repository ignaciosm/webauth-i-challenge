const express = require('express');
const sessions = require('express-session')
const KnexSessionStore = require('connect-session-knex')(sessions)
const AuthRouter = require('./auth/auth-router.js');
const knex = require('./database/db-config.js')
const server = express();
const sessionConfig = {
  name: 'potato',
  secret: 'senorita potatito del peru',
  saveUninitialized: false,
  resave: false,
  store: new KnexSessionStore({
    knex,
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: 'sid',
    tablename: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  },
}

server.use(express.json());
server.use(sessions(sessionConfig));
server.use('/api', AuthRouter);

module.exports = server;