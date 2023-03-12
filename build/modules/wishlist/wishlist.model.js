"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
var wishlistSchema = new mongoose_1.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    product: {
        type: ObjectId,
        ref: 'Product'
    }
});
exports.Wishlist = (0, mongoose_1.model)('Wishlist', wishlistSchema);
