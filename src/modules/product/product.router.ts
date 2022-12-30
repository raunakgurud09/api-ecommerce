import { Router } from 'express';
import {
  createProductHandler,
  getProductHandler
} from './product.controller';
import authorizePermissions from '../../middleware/auth.middleware';
import requiresUser from '../../middleware/requiresUser.middleware';

const router = Router();

router
  .route('/')
  .get(requiresUser, authorizePermissions('admin'), getProductHandler)
  .post(requiresUser, authorizePermissions('admin'), createProductHandler);
