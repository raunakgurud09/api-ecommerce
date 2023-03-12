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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.categoryHandler = void 0;
var lodash_1 = require("lodash");
var cloudinary_1 = require("../../lib/cloudinary");
var category_model_1 = require("./category.model");
var categoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category_model_1.Category.find()];
            case 1:
                categories = _a.sent();
                res.status(200).json({ data: categories });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Error in getting categories' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.categoryHandler = categoryHandler;
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, image, imageURL, category, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                image = (0, lodash_1.get)(req, 'file');
                if (!name) {
                    return [2 /*return*/, res.status(400).json({ message: 'name is required' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!image)
                    return [2 /*return*/, res.status(400).json({ message: 'Image is required' })];
                return [4 /*yield*/, cloudinary_1.Cloudinary.uploadFile(image, "category/".concat(name), {
                        height: 600,
                        width: 600
                    })];
            case 2:
                imageURL = _a.sent();
                if (!imageURL)
                    return [2 /*return*/, res.status(500).json({ message: 'Category image not uploaded' })];
                return [4 /*yield*/, category_model_1.Category.create({
                        name: name,
                        imageURL: imageURL
                    })];
            case 3:
                category = _a.sent();
                res.status(201).json({ category: category, message: 'Category created' });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Error in creating Category' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
