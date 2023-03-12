"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHash = void 0;
var crypto_1 = __importDefault(require("crypto"));
var createHash = function () {
    return crypto_1.default.randomBytes(40).toString('hex');
};
exports.createHash = createHash;
