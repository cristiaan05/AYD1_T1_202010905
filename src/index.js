const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/ver-info', (req, res) => {
    res.json({ nombre: "Tu Nombre", carnet: "Tu Carnet" });
});
let canciones = [];

    const { nombre, artista, album } = req.body;
app.post('/agregar-cancion', (req, res) => {
    }
        return res.status(400).json({ mensaje: 'Faltan datos' });
    if (!nombre || !artista || !album) {
    const nuevaCancion = { nombre, artista, album };
    canciones.push(nuevaCancion);
    res.status(201).json({ mensaje: 'Canción agregada', nuevaCancion });
});