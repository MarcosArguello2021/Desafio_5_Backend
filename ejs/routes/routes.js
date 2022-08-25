const productos = require('express').Router();
const { Contenedor } = require('../api/productos.js');
const productosApi = new Contenedor('./productos.txt');


productos.get('/', async (req, res) => {
    try {
        res.json(await productosApi.getAll());
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }

})

productos.get('/:id', async (req, res) => {
    try {
        res.json(await productosApi.getById(Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }

})

productos.post('/', async (req, res) => {
    await productosApi.save(req.body);
    res.redirect('/productos');
})

productos.put('/:id', async (req, res) => {
    try {
        res.json(await productosApi.update(req.body, Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }
})

productos.delete('/:id', async (req, res) => {
    res.json(await productosApi.deleteById(Number(req.params.id)))
})

module.exports = productos;