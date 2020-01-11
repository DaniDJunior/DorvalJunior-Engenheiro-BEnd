const productConverter = row => ({
    id: row.product_id,
    name: row.product_name,
    brand: row.product_brand,
    category: row.product_category,
    stock: row.product_stock,
    flagStock: row.product_stock > 0,
    store_id: row.store_id
});

class ProductDao {

    constructor(db) {
        this._db = db;
    }

    listAllProduct() {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  p.* 
                FROM product p;
                `, [],
                (err, rows) => {

                    const product = rows.map(productConverter)
                    console.log(product);
                    if (err) {
                        console.log(err);
                        return reject('Can`t list product');
                    }

                    resolve(product);
                });
        });
    }

    listProductByStokeId(stoke_id) {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  p.* 
                FROM product p
                WHERE store_id = ?;
                `, [stoke_id],
                (err, rows) => {

                    const product = rows.map(productConverter)
                    console.log(product);
                    if (err) {
                        console.log(err);
                        return reject('Can`t list product');
                    }

                    resolve(product);
                });
        });
    }

    listProductAvailableByStokeId(stoke_id) {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  p.* 
                FROM product p
                WHERE store_id = ? AND product_stock > 0;
                `, [stoke_id],
                (err, rows) => {

                    const product = rows.map(productConverter)
                    console.log(product);
                    if (err) {
                        console.log(err);
                        return reject('Can`t list product');
                    }

                    resolve(product);
                });
        });
    }

    listProductUnavailableByStokeId(stoke_id) {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  p.* 
                FROM product p
                WHERE store_id = ? AND product_stock = 0;
                `, [stoke_id],
                (err, rows) => {

                    const product = rows.map(productConverter)
                    console.log(product);
                    if (err) {
                        console.log(err);
                        return reject('Can`t list product');
                    }

                    resolve(product);
                });
        });
    }

}

module.exports = ProductDao;