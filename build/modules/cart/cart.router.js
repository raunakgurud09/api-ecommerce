"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
var express_1 = __importDefault(require("express"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var cart_controller_1 = require("./cart.controller");
var Router = express_1.default.Router();
exports.cartRouter = Router;
Router.route('/')
    .get(requiresUser_middleware_1.default, cart_controller_1.getCartHandler)
    .post(requiresUser_middleware_1.default, cart_controller_1.addToCartHandler)
    .put(requiresUser_middleware_1.default, cart_controller_1.updateCartHandler)
    .delete(requiresUser_middleware_1.default, cart_controller_1.removeCartHandler);
