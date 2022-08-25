const express = require('express');
const { engine } = require('express-handlebars')
const productos = require('./routes/routes')
const app = express();
const { Contenedor } = require('./api/productos.js');
const productosApi = new Contenedor('./productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/productos', productos);

app.engine('handlebars', engine())
app.set('view engine', 'handlebars') 

app.get('/', (req, res) => {
    res.render('carga');
})

app.get('/productos', async (req, res) => {
    try {
        let listExists;   
        const productos = await productosApi.getAll();
        productos==null ? listExists = false : listExists = true; 
        res.render('tabla', {lista: productos, listExists: listExists});
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log('server on');
})