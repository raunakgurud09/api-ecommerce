"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// "use strict";
var express_1 = __importDefault(require("express"));
var connectDB_1 = __importDefault(require("./utils/connectDB"));
var deserializeUser_middleware_1 = __importDefault(require("./middleware/deserializeUser.middleware"));
var index_config_1 = __importDefault(require("./configs/index.config"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(deserializeUser_middleware_1.default);
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Database
// Routes
var router_1 = require("./modules/auth/router");
var user_router_1 = require("./modules/user/user.router");
var admin_router_1 = require("./modules/admin/admin.router");
var product_router_1 = require("./modules/product/product.router");
var cart_router_1 = require("./modules/cart/cart.router");
var wishlist_route_1 = require("./modules/wishlist/wishlist.route");
var order_router_1 = require("./modules/orders/order.router");
app.get('/', function (req, res) { return res.send('working'); });
app.get('/api/v1', function (req, res) {
    res.status(200).json({ status: 'OK', message: 'API working' });
});
app.use('/api/v1/auth', router_1.authRouter);
app.use('/api/v1/user', user_router_1.userRouter);
app.use('/api/v1/admin', admin_router_1.adminRouter);
app.use('/api/v1/products', product_router_1.productRouter);
app.use('/api/v1/cart', cart_router_1.cartRouter);
app.use('/api/v1/wishlist', wishlist_route_1.wishlistRouter);
app.use('/api/v1/order', order_router_1.orderRouter);
var PORT = index_config_1.default.port;
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, connectDB_1.default)()];
            case 1:
                _a.sent();
                console.log("server is running on ".concat(PORT, "..."));
                return [2 /*return*/];
        }
    });
}); });
