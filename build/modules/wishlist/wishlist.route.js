"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRouter = void 0;
var express_1 = __importDefault(require("express"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var wishlist_controller_1 = require("./wishlist.controller");
var Router = express_1.default.Router();
exports.wishlistRouter = Router;
Router.route('/')
    .get(requiresUser_middleware_1.default, wishlist_controller_1.getWishlistHandler)
    .post(requiresUser_middleware_1.default, wishlist_controller_1.createWishlistHandler)
    .delete(requiresUser_middleware_1.default, wishlist_controller_1.deleteWishlistHandler);
