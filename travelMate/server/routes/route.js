'use strict';

const express = require('express');
const app = express();
const routeControl = require('./routeControl');

const messageRoutes = express.Router();

messageRoutes.post('/add', routeControl);
messageRoutes.get('/findAll', routeControl);
messageRoutes.post('/remove', routeControl);
// messageRoutes.route('/add').get((req, res) => {
//   console.log('getting root route...');
//   res.status(200).json({ message: 'message is added successfully' });
// });

const eventRoutes = express.Router();
eventRoutes.post('/add', routeControl);
eventRoutes.get('/findAll', routeControl);
eventRoutes.post('/remove', routeControl);

const userRoutes = express.Router();
userRoutes.post('/register', routeControl);
userRoutes.post('/login', routeControl);
userRoutes.post('/logout', routeControl);
userRoutes.post('/add', routeControl);
userRoutes.get('/findAll', routeControl);
userRoutes.get('/findAllToday', routeControl);
userRoutes.get('/findHistoryToday', routeControl);
userRoutes.post('/remove', routeControl);

const groupRoutes = express.Router();
groupRoutes.post('/add', routeControl);
groupRoutes.get('/findAll', routeControl);
groupRoutes.post('/remove', routeControl);
groupRoutes.post('/join', routeControl);
groupRoutes.post('/quit', routeControl);

module.exports = { messageRoutes, eventRoutes, userRoutes, groupRoutes };
