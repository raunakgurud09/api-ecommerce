"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionSchema = exports.createUserSchema = void 0;
var yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required('Name is required'),
        email: (0, yup_1.string)().required('email is required'),
        password: (0, yup_1.string)()
            .required('password is required')
            .min(6, 'password is to short - should be 6 char at least ')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'password can contain one latin letter'),
        role: (0, yup_1.string)()
    })
});
exports.createUserSessionSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .email('Must be a valid email')
            .required('Email is required'),
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.')
    })
});
