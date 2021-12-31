"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var log_1 = __importDefault(require("../configs/log"));
var product_1 = __importDefault(require("../models/product"));
var getAll = function (req, res, next) {
    product_1.default.find()
        .exec()
        .then(function (products) {
        return res.status(200).json({
            products: products,
            count: products.length
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var create = function (req, res, next) {
    var _a = req.body, name = _a.name, price = _a.price;
    var product = new product_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        price: price,
        name: name
    });
    return product
        .save()
        .then(function (result) {
        return res.status(201).json({
            product: result
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var update = function (req, res, next) {
    log_1.default.info('', '===>', req.params.id);
    if ((req.params.id && req.body.name) || req.body.price) {
        var product_filter_1 = { _id: req.params.id };
        product_1.default.findOne(product_filter_1, function (err, product_data) {
            if (err) {
                return res.status(500).json({
                    message: res,
                    error: err
                });
            }
            else if (product_data) {
                var product_2 = new product_1.default({
                    _id: req.params.id,
                    name: req.body.name ? req.body.name : product_data.name,
                    price: req.body.price ? req.body.price : product_data.price
                });
                product_1.default.findOneAndUpdate(product_filter_1, product_2, function (err) {
                    if (err) {
                        return res.status(500).json({
                            message: res,
                            error: err
                        });
                    }
                    else {
                        return res.status(204).json({
                            product: product_2
                        });
                    }
                });
            }
            else {
                return res.status(500).json({
                    message: 'invalid product',
                    error: null
                });
            }
        });
    }
    else {
        return res.status(500).json({
            message: 'insufficient parameters',
            error: null
        });
    }
};
var del = function (req, res, next) {
    if (req.params.id) {
        var query = { _id: req.params.id };
        product_1.default.deleteOne(query, function (err, products) {
            log_1.default.info('', '===>', products);
            if (err) {
                return res.status(500).json({
                    message: res,
                    error: err
                });
            }
            else if (products.deletedCount !== 0) {
                return res.status(204).json({});
            }
            else {
                return res.status(500).json({
                    message: 'invalid product',
                    error: null
                });
            }
        });
    }
    else {
        return res.status(500).json({
            message: 'insufficient parameters',
            error: null
        });
    }
};
//متد موجود در این فایل را برای بقیه فایل ها در دسترس قرار میدهیم
exports.default = { getAll: getAll, create: create, update: update, del: del };
//# sourceMappingURL=product.js.map