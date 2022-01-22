const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const {getTiendas,getCategories,getMarca, getSuperComplex} = require('./consultas');

app.listen(3000, () => { console.log('Running on 3000') });
app.use(express.urlencoded({ extended: true }));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: 'main',
        layoutsDir: `${__dirname}/views/mainLayout`,
        helpers: {
            inc: function(value) {
                return value + 1
            }
        }

    })
);

app.set('view engine', 'handlebars');

app.get('/', async(req, res) => {
    try {
        const tiendas = await getTiendas();
        const categories = await getCategories();
        const marca = await getMarca();
        console.log('listado de tiendas',tiendas);
        
        res.render('index', { tiendas,categories,marca });
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal ${e}`,
            code: 500
        })
    }
})

app.post('/Buscar',async(req,res)=>{
    const { tienda, categoria, marca} = req.body;
    console.log('body',req.body);
    console.log('Tienda ********************',tienda);
    const busqueda = await getSuperComplex(tienda,categoria,marca);
    

})