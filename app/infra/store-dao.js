const StoreConverter = row => ({
    id: row.store_id,
    name: row.store_name
});

class StoreDao {

    constructor(db) {
        this._db = db;
    }

    listAllStore() {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  s.* 
                FROM store s;
                `, [],
                (err, rows) => {

                    const store = rows.map(StoreConverter)
                    if (err) {
                        console.log(err);
                        return reject('Can`t list store');
                    }

                    resolve(store);
                });
        });
    }

    getStoreByName(stoke_name) {

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT  s.* 
                FROM store s
                WHERE store_name = ?;
                `, [stoke_name],
                (err, rows) => {

                    const store = rows.map(StoreConverter)
                    if (err) {
                        console.log(err);
                        return reject('Can`t list store');
                    }

                    resolve(store);
                });
        });
    }

}

module.exports = StoreDao;