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
    res.json({ nombre: "Cristian Fernando Hernandez Tello", carnet: "202010905" });
});
let canciones = [];

app.post('/agregar-cancion', (req, res) => {
    const { nombre, artista, genero } = req.body;
    if (!nombre || !artista || !genero) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }
    const nuevaCancion = { nombre, artista, genero };
    canciones.push(nuevaCancion);
    res.status(201).json({ mensaje: 'Canción agregada', nuevaCancion });
});