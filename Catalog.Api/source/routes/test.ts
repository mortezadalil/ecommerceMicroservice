import express from "express";
import controller from "../controllers/test";

//دسترسی به فضای روتر برای اضافه کردن روت های جدید
const router = express.Router();

//اضافه کردن روت جدید به نام تست و نسبت دادن آن به متد تستی که قبلا نوشتیم
router.get("/healthcheck", controller.serverHealthCheck);

//اکسپوز کردن روتر تغییر یافته برای در دسترس قرار گرفتن آن برای بقیه فایل ها
export = router;
