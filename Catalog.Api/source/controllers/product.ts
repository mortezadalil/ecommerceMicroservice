import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import log from '../configs/log';
import IProduct from '../interfaces/product';
import Product from '../models/product';

const getAll = (req: Request, res: Response, next: NextFunction) => {
    Product.find()
        .exec()
        .then((products) => {
            return res.status(200).json({
                products: products,
                count: products.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const create = (req: Request, res: Response, next: NextFunction) => {
    let { name, price } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        price,
        name
    });

    return product
        .save()
        .then((result) => {
            return res.status(201).json({
                product: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id && (req.body.name || req.body.price)) {
        const product_filter = { _id: req.params.id };

        Product.findOne(product_filter, (err: any, product_data: IProduct) => {
            if (err) {
                return res.status(500).json({
                    message: res,
                    error: err
                });
            } else if (product_data) {
                const product = new Product({
                    _id: req.params.id,
                    name: req.body.name ? req.body.name : product_data.name,
                    price: req.body.price ? req.body.price : product_data.price
                });

                Product.findOneAndUpdate(product_filter, product, (err: any) => {
                    if (err) {
                        return res.status(500).json({
                            message: res,
                            error: err
                        });
                    } else {
                        return res.status(204).json({
                            product: product
                        });
                    }
                });
            } else {
                return res.status(500).json({
                    message: 'invalid product',
                    error: null
                });
            }
        });
    } else {
        return res.status(500).json({
            message: 'insufficient parameters',
            error: null
        });
    }
};

const del = (req: Request, res: Response, next: NextFunction) => {
    const query = { _id: req.params.id };
    Product.deleteOne(query, (err: any, products: any) => {
        if (err) {
            return res.status(500).json({
                message: res,
                error: err
            });
        } else if (products.deletedCount !== 0) {
            return res.status(204).json({});
        } else {
            return res.status(500).json({
                message: 'invalid product',
                error: null
            });
        }
    });
};

//متد موجود در این فایل را برای بقیه فایل ها در دسترس قرار میدهیم
export default { getAll, create, update, del };
