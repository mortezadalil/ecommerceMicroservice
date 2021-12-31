"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//کتابخانه های مورد استفاده
var dotenv_1 = __importDefault(require("dotenv"));
//لود کردن مقادیر موجود در انوایرومنت
dotenv_1.default.config();
//تنظیمات مانگو
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};
var MONGO_HOST = process.env.MONGO_URL || "localhost:27017";
var MONGO = {
    host: MONGO_HOST,
    options: MONGO_OPTIONS,
    url: "mongodb://".concat(MONGO_HOST)
};
//دسترسی به متغیرهای انوایرومنت و اگر موجود نبودند استفاده از مقادیر پیش فرض
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.SERVER_PORT || 4300;
//تعریف آبجکتی حاوی متغیرهای مورد نیاز در نقاط دیگر برنامه
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
//ایجاد آبجکت دربرگیرنده تنظیمات بالا
var config = {
    server: SERVER,
    mongo: MONGO
};
//در معرض دسترسی قراردادن آبجکت کانفیگ برای بقیه فایلها
exports.default = config;
//# sourceMappingURL=config.js.map