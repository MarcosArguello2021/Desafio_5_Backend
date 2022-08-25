const express = require('express');
const productos = require('./routes/routes')
const app = express();
const { Contenedor } = require('./api/productos.js');
const productosApi = new Contenedor('./productos.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/productos', productos);
app.set('view engine', '.ejs') 

app.get('/', (req, res) => {
    res.render('carga');
})

app.get('/productos', async (req, res) => {
    try {
        const productos = await productosApi.getAll();
        res.render('tabla', {lista: productos});
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log('server on');
})