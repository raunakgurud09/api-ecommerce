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
exports.deleteProductHandler = exports.updateProductHandler = exports.getSingleProductHandler = exports.createProductHandler = exports.getProductHandler = void 0;
var Product_model_1 = require("./Product.model");
var product_service_1 = require("./product.service");
var getProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_model_1.Product.find({})];
            case 1:
                products = _a.sent();
                res.status(200).json({ products: products });
                return [2 /*return*/];
        }
    });
}); };
exports.getProductHandler = getProductHandler;
var createProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, description, category, image, input, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, description = _a.description, category = _a.category, image = _a.image;
                // const image = get(req, 'file')
                console.log(req.body);
                if (!name && !description && !price && !category) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'name, description, category and price are required' })];
                }
                input = {
                    name: name,
                    price: price,
                    description: description,
                    category: category
                };
                if (!image)
                    return [2 /*return*/, res.status(400).json({ message: "Image is required" })];
                return [4 /*yield*/, (0, product_service_1.createProduct)(input, image)];
            case 1:
                result = _b.sent();
                res.status(200).json(result);
                return [2 /*return*/];
        }
    });
}); };
exports.createProductHandler = createProductHandler;
var getSingleProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, relatedProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                return [4 /*yield*/, Product_model_1.Product.findById(productId)];
            case 1:
                product = _a.sent();
                if (!product)
                    return [2 /*return*/, { message: 'Product not found' }];
                return [4 /*yield*/, Product_model_1.Product.find({
                        category: product.category,
                        _id: { $ne: product._id }
                    }).limit(8)];
            case 2:
                relatedProducts = _a.sent();
                res.status(200).json({ product: product, relatedProducts: relatedProducts });
                return [2 /*return*/];
        }
    });
}); };
exports.getSingleProductHandler = getSingleProductHandler;
var updateProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                return [4 /*yield*/, Product_model_1.Product.findById(productId)];
            case 1:
                product = _a.sent();
                res.status(200).json(product);
                return [2 /*return*/];
        }
    });
}); };
exports.updateProductHandler = updateProductHandler;
var deleteProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                return [4 /*yield*/, Product_model_1.Product.findByIdAndDelete(productId)];
            case 1:
                product = _a.sent();
                res.status(200).json(product);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteProductHandler = deleteProductHandler;
