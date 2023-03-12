"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
var OrderSchema = new mongoose_1.Schema({
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
            size: { type: String, default: 'M' },
            product: {
                type: ObjectId,
                ref: 'Product'
            }
        }
    ],
    total: { type: Number },
    isPaid: { type: Boolean, default: false },
    paymentMethod: { type: String, require: true }
}, {
    timestamps: true
});
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
