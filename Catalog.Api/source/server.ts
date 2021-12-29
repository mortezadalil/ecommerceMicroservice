//کتابخانه های مورد استفاده
import http from "http"; //دسترسی به ابزار تعامل با اچ تی تی پی و ایجاد سرور
import bodyParser from "body-parser"; //دسترسی به مفسر دیتای ورودی
import express from "express"; //کتابخانه یا فریم ورک برای ایجاد ای پی آی در وب
import log from "./configs/log"; //دسترسی به آنچه از فایل لاگ -که ما ایجاد کردیم- که اکسپوز شده
import config from "./configs/config"; //دسترسی به آنچه از فایل کانفیگ -که ماایجاد کردیم- اکسپوز شده
import testRoutes from "./routes/test";

//تعریف ثابت برای استفاده در لاگ
const NAMESPACE = "Server";
//لود کردن فریم ورک اکسپرس در یک متغیر برای دسترسی های آتی به متدهای آن
const router = express();

//به کمک این مدیلویر ریکوئستی بیاید این جا لاگ میشود و سپس نکست میشود به ادامه روند
router.use((req, res, next) => {
  //لاگ کردن ریکوئست
  log.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  //لاگ کردن ریزالت
  res.on("finish", () => {
    log.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

//مفسر ریکوئست برای ایجاد آبجکت مناسب
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//میدلویر شرایط و قواعد استرسی به ای پی آی ها در هر ریکوئست بررسی میشود و در نهایت به ادامه روند منتقل میشویم
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

//مسیر برای دسترسی به یک روت از پیش تعریف شده
router.use("/api/test", testRoutes);

//میدلویر برای کنترل خطاها. در این میدلویر به ادامه روند منتقل نمیشویم و خروجی تولید میشود.
router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

//ایجاد سرور
const httpServer = http.createServer(router);

//اجرای سرور با پورت و آی پی خاصی که در فایل کانفیگ تعریف کردیم
httpServer.listen(config.server.port, () =>
  log.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
