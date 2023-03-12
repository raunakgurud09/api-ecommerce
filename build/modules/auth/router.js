"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router();
exports.authRouter = Router;
var auth_controller_1 = require("./auth.controller");
Router.route('/register').post(auth_controller_1.register);
Router.route('/login').post(auth_controller_1.login);
Router.route('/google').post(auth_controller_1.loginViaGoogle);
Router.route('/logout').delete(auth_controller_1.logout);
