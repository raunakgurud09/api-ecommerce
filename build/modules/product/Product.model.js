"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    category: String
}, {
    timestamps: true
});
productSchema.index({ name: 'text' }, { weights: { name: 3 } });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
