"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var String = mongoose_1.Schema.Types.String;
var CategorySchema = new mongoose_1.Schema({
    name: String,
    imageURL: String,
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
