//کتابخانه های مورد استفاده
import dotenv from "dotenv";

//لود کردن مقادیر موجود در انوایرومنت
dotenv.config();

//دسترسی به متغیرهای انوایرومنت و اگر موجود نبودند استفاده از مقادیر پیش فرض
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4300;

//تعریف آبجکتی حاوی متغیرهای مورد نیاز در نقاط دیگر برنامه
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

//ایجاد آبجکت دربرگیرنده تنظیمات بالا
const config = {
  server: SERVER,
};

//در معرض دسترسی قراردادن آبجکت کانفیگ برای بقیه فایلها
export default config;
