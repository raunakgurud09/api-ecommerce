import express from 'express';
import authorizePermissions from '../middleware/auth.middleware';
import requiresUser from '../middleware/requiresUser.middleware';
import validateRequest from '../middleware/validate.middleware';
const Router = express.Router();

export default Router;
