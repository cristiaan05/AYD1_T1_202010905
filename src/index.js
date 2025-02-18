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
