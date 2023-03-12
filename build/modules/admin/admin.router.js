"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router();
exports.adminRouter = Router;
var auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var admin_controller_1 = require("./admin.controller");
Router.route('/users').get(requiresUser_middleware_1.default, (0, auth_middleware_1.default)('admin'), admin_controller_1.getAllUserHandler);
