"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateCart = exports.addToCart = exports.getCart = void 0;
var cart_provider_1 = __importDefault(require("./cart.provider"));
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Types.ObjectId;
var getCart = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, cart, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = user.userId;
                return [4 /*yield*/, cart_provider_1.default.findAndPopulate(userId)];
            case 1:
                cart = _a.sent();
                return [2 /*return*/, { data: cart }];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, { message: 'No cart found for this user' }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCart = getCart;
var addToCart = function (user, productId, qty, size) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, isProductExist, find, updatePayload, options, find, updatePayload, options, cartItem, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, cart_provider_1.default.findCartByUserId(user.userId)];
            case 1:
                cart = _a.sent();
                if (!cart) return [3 /*break*/, 6];
                // Make sure the cart is users cart
                if (user.userId.toString() !== cart.user.toString()) {
                    return [2 /*return*/, {
                            message: 'You are not allowed to perform this operation as you not the owner'
                        }];
                }
                isProductExist = cart === null || cart === void 0 ? void 0 : cart.items.some(function (item) {
                    return new ObjectId(productId).equals(item.product);
                });
                if (!isProductExist) return [3 /*break*/, 3];
                find = { _id: cart._id, 'items.product': productId };
                updatePayload = { $inc: { 'items.$.quantity': qty } };
                options = { new: true };
                return [4 /*yield*/, cart_provider_1.default.updateExistingCart(find, updatePayload, options)];
            case 2:
                cart = _a.sent();
                return [3 /*break*/, 5];
            case 3:
                find = { _id: cart._id };
                updatePayload = {
                    $addToSet: {
                        items: { quantity: qty, product: productId, size: size }
                    }
                };
                options = { new: true };
                return [4 /*yield*/, cart_provider_1.default.updateExistingCart(find, updatePayload, options)];
            case 4:
                cart = _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, cart_provider_1.default.create(user.userId, [
                    { quantity: qty, size: size, product: productId }
                ])];
            case 7:
                // Create new cart
                cart = _a.sent();
                _a.label = 8;
            case 8:
                cartItem = cart === null || cart === void 0 ? void 0 : cart.items.find(function (item) {
                    return new ObjectId(productId).equals(item.product);
                });
                return [2 /*return*/, { data: cartItem }];
            case 9:
                error_2 = _a.sent();
                return [2 /*return*/, { message: "Error couldn't create your cart" }];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.addToCart = addToCart;
var updateCart = function (user, productId, qty, size) { return __awaiter(void 0, void 0, void 0, function () {
    var find, updatePayload, options, cart, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                find = { user: user.userId, 'items.product': productId };
                updatePayload = {
                    $set: { 'items.$.quantity': qty, 'items.$.size': size }
                };
                options = { new: true };
                return [4 /*yield*/, cart_provider_1.default.updateExistingCart(find, updatePayload, options)];
            case 1:
                cart = _a.sent();
                if (!cart) {
                    return [2 /*return*/, { message: 'Cart item not found' }];
                }
                return [2 /*return*/, { data: cart }];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, { message: "Couldn't remove product form cart" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCart = updateCart;
var removeFromCart = function (user, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var find, updatePayload, options, cart, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                find = { user: user.userId };
                updatePayload = { $pull: { items: { product: productId } } };
                options = { new: true };
                return [4 /*yield*/, cart_provider_1.default.updateExistingCart(find, updatePayload, options)];
            case 1:
                cart = _a.sent();
                if (!cart) {
                    return [2 /*return*/, { message: 'Cart item not found' }];
                }
                return [2 /*return*/, { data: cart }];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, { message: "Couldn't remove product form cart" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeFromCart = removeFromCart;
