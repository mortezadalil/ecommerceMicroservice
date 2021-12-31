"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var test_1 = __importDefault(require("../controllers/test"));
//دسترسی به فضای روتر برای اضافه کردن روت های جدید
var router = express_1.default.Router();
//اضافه کردن روت جدید به نام تست و نسبت دادن آن به متد تستی که قبلا نوشتیم
router.get('/healthcheck', test_1.default.serverHealthCheck);
module.exports = router;
//# sourceMappingURL=test.js.map