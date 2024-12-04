import * as Product from '../models/product.js';

export function listProducts(req, res) { // Lista todos os produtos disponiveis
    res.status(200).json({message: Product.getProducts()});
}

export function getProduct(req, res) { // Lista um produto pelo :id no GET
    const product = Product.getProduct(req.params.id);
    if (!product) {
        return res.status(404).json({message: 'Product not found'});
    }
    res.status(200).json({message: product});
}