const { ProductDao, StoreDao } = require('../infra');

const api = {}

api.list = async(req, res) => {
    console.log('####################################');

    console.log(`Listing product form available grover-de`);
    const stores = await new StoreDao(req.db)
        .getStoreByName('grover-de');
    const productes = await new ProductDao(req.db)
        .listProductAvailableByStokeId(stores[0].id);
    res.json(productes);

}

api.listStore = async(req, res) => {
    console.log('####################################');
    const { store } = req.params;
    console.log(`Listing product form available `, store);
    const stores = await new StoreDao(req.db)
        .getStoreByName(store);
    const productes = await new ProductDao(req.db)
        .listProductAvailableByStokeId(stores[0].id);
    res.json(productes);

}

api.listStoreUnavailable = async(req, res) => {
    console.log('####################################');
    const { store } = req.params;
    console.log(`Listing product form unavailable `, store);
    const stores = await new StoreDao(req.db)
        .getStoreByName(store);
    const productes = await new ProductDao(req.db)
        .listProductUnavailableByStokeId(stores[0].id);
    res.json(productes);

}

module.exports = api;