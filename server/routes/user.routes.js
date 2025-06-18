import express from 'express';
import { getUserByIp } from '../controller/user.controller.js';
const route = express.Router();

route.get('/getuser', getUserByIp)

export default route;