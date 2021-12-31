"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var product_1 = __importDefault(require("../controllers/product"));
//دسترسی به فضای روتر برای اضافه کردن روت های جدید
var router = express_1.default.Router();
//اضافه کردن روت جدید به نام تست و نسبت دادن آن به متد تستی که قبلا نوشتیم
router.get('/list', product_1.default.getAll);
router.post('/add', product_1.default.create);
router.put('/update/:id', product_1.default.update);
router.delete('/delete/:id', product_1.default.del);
module.exports = router;
//# sourceMappingURL=product.js.map