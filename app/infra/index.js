const ProductDao = require('./product-dao'),
    StoreDao = require('./store-dao'),
    wrapAsync = require('./async-wrap');


module.exports = {
    ProductDao,
    StoreDao,
    wrapAsync
};