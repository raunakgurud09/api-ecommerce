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
exports.deleteWishlist = exports.createWishlist = exports.getWishlist = void 0;
var wishlist_model_1 = require("./wishlist.model");
var wishlist_provider_1 = __importDefault(require("./wishlist.provider"));
var getWishlist = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, wishlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = user.userId;
                return [4 /*yield*/, wishlist_model_1.Wishlist.findOne({ user: userId })];
            case 1:
                wishlist = _a.sent();
                if (!wishlist)
                    return [2 /*return*/, { message: 'Wishlist is Empty' }];
                return [2 /*return*/, { data: wishlist }];
        }
    });
}); };
exports.getWishlist = getWishlist;
var createWishlist = function (user, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var find, wishlist, options, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                find = {
                    user: user.userId,
                    product: productId
                };
                return [4 /*yield*/, wishlist_provider_1.default.findOne(find)];
            case 1:
                wishlist = _a.sent();
                if (wishlist) {
                    return [2 /*return*/, { message: 'Product is already on your wishlist' }];
                }
                options = {
                    user: user.userId,
                    product: productId
                };
                return [4 /*yield*/, wishlist_provider_1.default.create(options)];
            case 2:
                wishlist = _a.sent();
                return [4 /*yield*/, wishlist.populate('product')];
            case 3:
                wishlist = _a.sent();
                return [2 /*return*/, { data: wishlist, message: 'Added to wishlist' }];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, { message: "Error! couldn't be added to wishlist" }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createWishlist = createWishlist;
var deleteWishlist = function (user, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var options, wishlist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                options = {
                    user: user.userId,
                    product: productId
                };
                return [4 /*yield*/, wishlist_provider_1.default.findOne(options)];
            case 1:
                wishlist = _a.sent();
                if (!wishlist) {
                    return [2 /*return*/, { message: 'Product is not on your wishlist' }];
                }
                return [4 /*yield*/, wishlist.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, { data: null, message: 'Removed from wishlist' }];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, { message: "Error! couldn't be added to wishlist" }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteWishlist = deleteWishlist;
