"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = __importDefault(require("express"));
var product_controller_1 = require("./product.controller");
var auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var user_router_1 = require("../user/user.router");
var banner_controller_1 = require("./banner.controller");
var category_controller_1 = require("./category.controller");
var Router = express_1.default.Router();
exports.productRouter = Router;
Router.route('/categories').get(category_controller_1.categoryHandler);
Router.route('/categories').post(requiresUser_middleware_1.default, (0, auth_middleware_1.default)('admin'), user_router_1.uploads.single('image'), category_controller_1.createCategory);
Router.route('/banners').get(banner_controller_1.BannerHandler);
Router.route('/banners').post(requiresUser_middleware_1.default, (0, auth_middleware_1.default)('admin'), user_router_1.uploads.single('image'), banner_controller_1.createBanner);
Router.route('/')
    .get(product_controller_1.getProductHandler)
    .post(requiresUser_middleware_1.default, (0, auth_middleware_1.default)('admin'), user_router_1.uploads.single('image'), product_controller_1.createProductHandler);
Router.route('/:productId')
    .get(product_controller_1.getSingleProductHandler)
    .patch(requiresUser_middleware_1.default, (0, auth_middleware_1.default)('admin'), user_router_1.uploads.single('image'), product_controller_1.updateProductHandler)
    .delete(requiresUser_middleware_1.default, (0, auth_middleware_1.default)('admin'), product_controller_1.deleteProductHandler);
