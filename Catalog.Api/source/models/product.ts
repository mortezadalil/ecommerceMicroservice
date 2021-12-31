import mongoose, { Schema } from 'mongoose';
import log from '../configs/log';
import IProduct from '../interfaces/product';

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

ProductSchema.post<IProduct>('save', function () {
    log.info('Mongo', 'Checkout the Product we just saved: ', this);
});

export default mongoose.model<IProduct>('Product', ProductSchema);
