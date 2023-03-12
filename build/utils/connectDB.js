"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var index_config_1 = __importDefault(require("../configs/index.config"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectDB() {
    var dbUrl = index_config_1.default.dbUriCloud;
    // const dbUrl = process.env.CLOUD_DBURL as string;
    return mongoose_1.default.connect(dbUrl, {}).then(function () {
        console.log("database connected");
    }).catch(function (error) {
        console.log(error);
        process.exit(1);
    });
}
exports.default = connectDB;
