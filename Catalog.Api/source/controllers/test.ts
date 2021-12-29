import { NextFunction, Request, Response } from "express";

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  //بدون هیچ محاسبه وبیزنسی فقط یک متن به شکل تست به خروجی بر میگردانیم که استتوس 200 داشته باشد
  return res.status(200).json({
    message: "health check Ok!",
  });
};

//متد موجود در این فایل را برای بقیه فایل ها در دسترس قرار میدهیم
export default { serverHealthCheck };
