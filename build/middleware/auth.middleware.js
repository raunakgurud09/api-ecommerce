"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var authorizePermissions = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return res
                .status(401)
                .json({ message: 'Unauthorized to access this route' });
        }
        next();
    };
};
exports.default = authorizePermissions;
