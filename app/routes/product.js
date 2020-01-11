const { ProductAPI } = require('../api'), { wrapAsync } = require('../infra')

module.exports = app => {

    app.route('/product')
        .get(wrapAsync(ProductAPI.list));

    app.route('/product/:store')
        .get(wrapAsync(ProductAPI.listStore));

    app.route('/product/:store/un')
        .get(wrapAsync(ProductAPI.listStoreUnavailable));
};