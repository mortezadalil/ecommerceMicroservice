"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverHealthCheck = function (req, res, next) {
    //بدون هیچ محاسبه وبیزنسی فقط یک متن به شکل تست به خروجی بر میگردانیم که استتوس 200 داشته باشد
    return res.status(200).json({
        message: 'health check Ok!'
    });
};
//متد موجود در این فایل را برای بقیه فایل ها در دسترس قرار میدهیم
exports.default = { serverHealthCheck: serverHealthCheck };
//# sourceMappingURL=test.js.map