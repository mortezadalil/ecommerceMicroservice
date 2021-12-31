"use strict";
/***
 * فایلی برای تعریف متدهای خوش تعریف به منظور استفاده در نقاطی که به لاگ نیاز است ایجاد کردیم
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var info = function (namespace, message, object) {
    if (object) {
        console.info("[".concat(getTimeStamp(), "] [INFO] [").concat(namespace, "] ").concat(message), object);
    }
    else {
        console.info("[".concat(getTimeStamp(), "] [INFO] [").concat(namespace, "] ").concat(message));
    }
};
var warn = function (namespace, message, object) {
    if (object) {
        console.warn("[".concat(getTimeStamp(), "] [WARN] [").concat(namespace, "] ").concat(message), object);
    }
    else {
        console.warn("[".concat(getTimeStamp(), "] [WARN] [").concat(namespace, "] ").concat(message));
    }
};
var error = function (namespace, message, object) {
    if (object) {
        console.error("[".concat(getTimeStamp(), "] [ERROR] [").concat(namespace, "] ").concat(message), object);
    }
    else {
        console.error("[".concat(getTimeStamp(), "] [ERROR] [").concat(namespace, "] ").concat(message));
    }
};
var debug = function (namespace, message, object) {
    if (object) {
        console.debug("[".concat(getTimeStamp(), "] [DEBUG] [").concat(namespace, "] ").concat(message), object);
    }
    else {
        console.debug("[".concat(getTimeStamp(), "] [DEBUG] [").concat(namespace, "] ").concat(message));
    }
};
//متد برای گرفتن زمان جاری
var getTimeStamp = function () {
    return new Date().toISOString();
};
//متدهای ساخته شده را اکسپوز میکنیم که در فایل های دیگر بتوانیم از آنها استفاده کنیم.
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
//# sourceMappingURL=log.js.map