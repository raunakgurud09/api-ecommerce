"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = void 0;
var attachCookiesToResponse = function (res, toAttach, options) {
    var oneDayExpire = 1000 * 60 * 60 * 24; //24 hours
    res.cookie(toAttach, options, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // signed: true,
        expires: new Date(Date.now() + oneDayExpire)
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
