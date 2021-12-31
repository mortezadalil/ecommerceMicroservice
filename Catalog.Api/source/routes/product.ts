import express from 'express';
import controller from '../controllers/test';
import productController from '../controllers/product';

//دسترسی به فضای روتر برای اضافه کردن روت های جدید
const router = express.Router();

//اضافه کردن روت جدید به نام تست و نسبت دادن آن به متد تستی که قبلا نوشتیم
router.get('/list', productController.getAll);
router.post('/add', productController.create);
router.put('/update/:id', productController.update);
router.delete('/delete/:id', productController.del);

//اکسپوز کردن روتر تغییر یافته برای در دسترس قرار گرفتن آن برای بقیه فایل ها
export = router;
