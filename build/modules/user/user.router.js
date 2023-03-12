"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.uploads = void 0;
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router();
exports.userRouter = Router;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({});
var user_controller_1 = require("./user.controller");
// import { createUserSchema, createUserSessionSchema } from '../auth/user.schema'
// import validateRequest from '../../middleware/validate.middleware'
// import {
//   createUserSessionHandler,
//   getUserSessionsHandler,
//   invalidateUserSessionHandler
// } from '../../controller/session.controller'
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb('invalid image file!', false);
    }
};
exports.uploads = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
Router.route('/profile').get(requiresUser_middleware_1.default, user_controller_1.getUserProfileHandler);
Router.post('/upload-avatar', requiresUser_middleware_1.default, exports.uploads.single('image'), user_controller_1.uploadAvatarHandler);
Router.post('/verify-email', requiresUser_middleware_1.default, user_controller_1.verifyUserHandler);
//authorize user only path
Router.get('/authorized', requiresUser_middleware_1.default, (0, auth_middleware_1.default)('user'), user_controller_1.getAuthorizedUser);
