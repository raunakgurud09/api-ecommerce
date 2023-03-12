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
var cloudinary_1 = require("../../lib/cloudinary");
var user_provider_1 = __importDefault(require("./user.provider"));
//This user is an token user
var profile = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, foundUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = user.userId;
                return [4 /*yield*/, user_provider_1.default.findUserById(userId)];
            case 1:
                foundUser = _a.sent();
                if (!foundUser)
                    return [2 /*return*/, { message: 'User not found' }];
                return [2 /*return*/, { foundUser: foundUser, message: 'User found' }];
        }
    });
}); };
var uploadAvatar = function (user, 
// image: Express.Multer.File | undefined
image) { return __awaiter(void 0, void 0, void 0, function () {
    var imageUrl, userId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!image)
                    return [2 /*return*/, { message: 'File not uploaded properly' }];
                return [4 /*yield*/, cloudinary_1.Cloudinary.upload(image, "avatar/".concat(user.userId), {
                        height: 600,
                        width: 600
                    })];
            case 1:
                imageUrl = _a.sent();
                if (!imageUrl)
                    return [2 /*return*/, { message: 'Avatar not uploaded' }];
                userId = user.userId;
                return [4 /*yield*/, user_provider_1.default.changeUserImage(userId, imageUrl)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.default = {
    profile: profile,
    uploadAvatar: uploadAvatar
};
