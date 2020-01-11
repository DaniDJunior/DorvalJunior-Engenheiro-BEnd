const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const STORE_SCHEMA = `
CREATE TABLE IF NOT EXISTS store (
    store_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    store_name VARCHAR(30) NOT NULL UNIQUE
)
`;

const PRODUCT_SCHEMA = `
CREATE TABLE IF NOT EXISTS product (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    product_name VARCHAR(30) NOT NULL UNIQUE, 
    product_brand VARCHAR(255) NOT NULL, 
    product_category VARCAHR(255) NOT NULL,
    product_stock INTEGER NOT NULL,
    store_id INTEGER,
    FOREIGN KEY(store_id) REFERENCES store(store_id) ON DELETE CASCADE
)
`;

const INSERT_STORE_grover_de =
    `
INSERT INTO store (
    store_name
) SELECT 'grover-de' WHERE NOT EXISTS (SELECT * FROM store WHERE store_name = 'grover-de')
`;

const INSERT_STORE_mm_berlin =
    `
INSERT INTO store (
    store_name
) SELECT 'mm-berlin' WHERE NOT EXISTS (SELECT * FROM store WHERE store_name = 'mm-berlin')
`;

const INSERT_PRODUCT_grover_de_1 =
    `
INSERT INTO product (
    product_name,product_brand,product_category,product_stock,store_id
) SELECT 'iPhone 6','Apple','Cellphone',2,(SELECT store_id FROM store WHERE store_name = 'grover-de') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = 'iPhone 6')
`;

const INSERT_PRODUCT_grover_de_2 =
    `
INSERT INTO product (
    product_name,product_brand,product_category,product_stock,store_id
) SELECT 'Nikon D3200','Nikon','Camera',0,(SELECT store_id FROM store WHERE store_name = 'grover-de') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = 'Nikon D3200')
`;

const INSERT_PRODUCT_grover_de_3 =
    `
INSERT INTO product (
    product_name,product_brand,product_category,product_stock,store_id
) SELECT 'Spark Fly','DJI','Drone',1,(SELECT store_id FROM store WHERE store_name = 'grover-de') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = 'Spark Fly')
`;

const INSERT_PRODUCT_mm_berlin_1 =
    `
INSERT INTO product (
    product_name,product_brand,product_category,product_stock,store_id
) SELECT 'Galaxy Note 10','Sansung','Cellphone',4,(SELECT store_id FROM store WHERE store_name = 'mm-berlin') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = 'Galaxy Note 10')
`;

const INSERT_PRODUCT_mm_berlin_2 =
    `
INSERT INTO product (
    product_name,product_brand,product_category,product_stock,store_id
) SELECT 'canon EOS Rebel T7','Canon','Camera',2,(SELECT store_id FROM store WHERE store_name = 'mm-berlin') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = 'canon EOS Rebel T7')
`;

const INSERT_PRODUCT_mm_berlin_3 =
    `
INSERT INTO product (
    product_name,product_brand,product_category,product_stock,store_id
) SELECT 'Mavic 2','DJI','Drone',0,(SELECT store_id FROM store WHERE store_name = 'mm-berlin') WHERE NOT EXISTS (SELECT * FROM product WHERE product_name = 'Mavic 2')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(STORE_SCHEMA);
    db.run(PRODUCT_SCHEMA);
    db.run(INSERT_STORE_grover_de);
    db.run(INSERT_STORE_mm_berlin);
    db.run(INSERT_PRODUCT_grover_de_1);
    db.run(INSERT_PRODUCT_grover_de_2);
    db.run(INSERT_PRODUCT_grover_de_3);
    db.run(INSERT_PRODUCT_mm_berlin_1);
    db.run(INSERT_PRODUCT_mm_berlin_2);
    db.run(INSERT_PRODUCT_mm_berlin_3);

});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;