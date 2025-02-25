const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Lade die JSON-Datei
let products = require('./products.json');

// GET: Alle Produkte abrufen
app.get('/products', (req, res) => {
    res.json(products);
});

// GET: Produkt nach ID abrufen
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// POST: Neues Produkt hinzufügen
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };

    products.push(newProduct);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2)); // JSON-Datei aktualisieren
    res.status(201).json(newProduct);
});

// PUT: Produkt aktualisieren
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex >= 0) {
        products[productIndex] = { id: productId, ...req.body };
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 2)); // JSON-Datei aktualisieren
        res.json(products[productIndex]);
    } else {
        res.status(404).send('Product not found');
    }
});

// DELETE: Produkt löschen
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(p => p.id !== productId);

    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2)); // JSON-Datei aktualisieren
    res.status(204).send();
});

// Server starten
app.listen(PORT, () => {
            console.log(Server is running on http: //localhost:${port});
            });