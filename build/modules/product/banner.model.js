"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
var mongoose_1 = require("mongoose");
var String = mongoose_1.Schema.Types.String;
var BannerSchema = new mongoose_1.Schema({
    name: String,
    imageURL: String,
    description: String,
}, {
    timestamps: true,
});
exports.Banner = (0, mongoose_1.model)('Banner', BannerSchema);
