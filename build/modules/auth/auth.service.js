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
exports.login = exports.create = void 0;
var jwt_utils_1 = require("../../utils/jwt.utils");
var auth_provider_1 = __importDefault(require("./auth.provider"));
var index_config_1 = __importDefault(require("../../configs/index.config"));
var create = function (_a) {
    var name = _a.name, email = _a.email, password = _a.password, role = _a.role;
    return __awaiter(void 0, void 0, void 0, function () {
        var emailAlreadyExists, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_provider_1.default.findUserBy('email', email)];
                case 1:
                    emailAlreadyExists = _b.sent();
                    if (emailAlreadyExists) {
                        return [2 /*return*/, { message: 'Email already exist' }];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, auth_provider_1.default.createUser({
                            name: name,
                            email: email,
                            password: password,
                            role: role
                        })];
                case 3:
                    user = _b.sent();
                    return [4 /*yield*/, auth_provider_1.default.saveUser(user)
                        // send verification email
                    ];
                case 4:
                    _b.sent();
                    // send verification email
                    return [2 /*return*/, user];
                case 5:
                    error_1 = _b.sent();
                    return [2 /*return*/, { message: 'Error in creating user' }];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.create = create;
var login = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, isMatch, tokenUser, accessToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_provider_1.default.findUserBy('email', email)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, { message: 'Email not found' }];
                    }
                    return [4 /*yield*/, auth_provider_1.default.comparePassword(user, password)];
                case 2:
                    isMatch = _b.sent();
                    if (!isMatch) {
                        return [2 /*return*/, { message: 'Wrong password' }];
                    }
                    return [4 /*yield*/, (0, jwt_utils_1.createTokenUser)(user)];
                case 3:
                    tokenUser = _b.sent();
                    return [4 /*yield*/, (0, jwt_utils_1.sign)(tokenUser, index_config_1.default.privateKey)];
                case 4:
                    accessToken = _b.sent();
                    return [2 /*return*/, { accessToken: accessToken, message: 'Login successful' }];
            }
        });
    });
};
exports.login = login;
exports.default = {
    create: exports.create,
    login: exports.login
};
