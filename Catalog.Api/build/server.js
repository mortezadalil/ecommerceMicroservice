"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//کتابخانه های مورد استفاده
var http_1 = __importDefault(require("http")); //دسترسی به ابزار تعامل با اچ تی تی پی و ایجاد سرور
var body_parser_1 = __importDefault(require("body-parser")); //دسترسی به مفسر دیتای ورودی
var express_1 = __importDefault(require("express")); //کتابخانه یا فریم ورک برای ایجاد ای پی آی در وب
var log_1 = __importDefault(require("./configs/log")); //دسترسی به آنچه از فایل لاگ -که ما ایجاد کردیم- که اکسپوز شده
var config_1 = __importDefault(require("./configs/config")); //دسترسی به آنچه از فایل کانفیگ -که ماایجاد کردیم- اکسپوز شده
var mongoose_1 = __importDefault(require("mongoose"));
var test_1 = __importDefault(require("./routes/test"));
var product_1 = __importDefault(require("./routes/product"));
//تعریف ثابت برای استفاده در لاگ
var NAMESPACE = 'Server';
//لود کردن فریم ورک اکسپرس در یک متغیر برای دسترسی های آتی به متدهای آن
var router = (0, express_1.default)();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then(function (result) {
    log_1.default.info(NAMESPACE, 'Mongo Connected');
})
    .catch(function (error) {
    log_1.default.error(NAMESPACE, error.message, error);
});
//به کمک این مدیلویر ریکوئستی بیاید این جا لاگ میشود و سپس نکست میشود به ادامه روند
router.use(function (req, res, next) {
    //لاگ کردن ریکوئست
    log_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    //لاگ کردن ریزالت
    res.on('finish', function () {
        log_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
//مفسر ریکوئست برای ایجاد آبجکت مناسب
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
//میدلویر شرایط و قواعد استرسی به ای پی آی ها در هر ریکوئست بررسی میشود و در نهایت به ادامه روند منتقل میشویم
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//مسیر برای دسترسی به یک روت از پیش تعریف شده
router.use('/api/test', test_1.default);
router.use('/api/product', product_1.default);
//میدلویر برای کنترل خطاها. در این میدلویر به ادامه روند منتقل نمیشویم و خروجی تولید میشود.
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
//ایجاد سرور
var httpServer = http_1.default.createServer(router);
//اجرای سرور با پورت و آی پی خاصی که در فایل کانفیگ تعریف کردیم
httpServer.listen(config_1.default.server.port, function () { return log_1.default.info(NAMESPACE, "Server is running ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port)); });
//# sourceMappingURL=server.js.map