"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
var cartSchema = new mongoose_1.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    items: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
                default: 'M'
            },
            product: {
                type: ObjectId,
                ref: 'Product'
            }
        }
    ]
}, {
    timestamps: true
});
exports.Cart = (0, mongoose_1.model)('Cart', cartSchema);
