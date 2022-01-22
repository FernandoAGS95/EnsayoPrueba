const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'ADMIN',
    port: 5432,
    host: 'localhost',
    database: 'bikeShop'
})

const getTiendas =async()=>{
    const result = await pool.query(`SELECT stores.store_name FROM stores `);

    return result.rows;
}
const getCategories =async()=>{
    const result = await pool.query(`SELECT categories.category_name FROM categories`);
    return result.rows;
}
const getMarca =async()=>{
    const result = await pool.query(`SELECT brands.brand_name FROM brands`);
    return result.rows;
}
const getSuperComplex = async(tienda,categoria,marca)=>{
    console.log('Tienda el query',tienda);
    console.log('categoria el query',categoria);
    console.log('marca el query',marca);
    const result = await pool.query(`SELECT b.store_name, c.product_id,c.product_name,a.quantity

    from stocks as a
    join stores as b
    on b.store_id = a.store_id
    
    join products as c
    on c.product_id = a.product_id
    
    join categories as d
    on d.category_id = c.category_id
    
    join brands as e 
    on e.brand_id = c.brand_id
    
    where b.store_name ='${tienda}'
    AND   d.category_name ='${categoria}'
    AND   e.brand_name = '${marca}'`)
    
    return result.rows;
}

module.exports = {
    getTiendas,
    getCategories,
    getMarca,
    getSuperComplex
}