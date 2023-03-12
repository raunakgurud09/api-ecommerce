"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require("express"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var order_controller_1 = require("./order.controller");
var Router = express_1.default.Router();
exports.orderRouter = Router;
Router.route('/').get(requiresUser_middleware_1.default, order_controller_1.index);
