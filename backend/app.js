const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let planetas = [
    { id: 2, nombre: 'Mercurio', tamanio: 250000, masa: 50, tipo: "Rocoso", distancia: 800000, vida:'Si', anillo: 'No', compAtmosfera:'El planeta de Freddy Mercury' },
    { id: 1, nombre: 'Venus', tamanio: 120000, masa: 50, tipo: "Rocoso", distancia: 1000000, vida:'No', anillo: 'No', compAtmosfera:'El planeta de la mujeres' },
    { id: 3, nombre: 'Tierra', tamanio: 150000, masa: 50, tipo: "Rocoso", distancia: 1200000, vida:'No', anillo: 'No', compAtmosfera: 'El mejor planeta del universo papaaaaaa' }
];

// Middleware para simular una demora de 3 segundos
const simulateDelay = (req, res, next) => {
    setTimeout(next, 3000);
};

/**
 * Obtiene todas las Planetas
 */
app.get('/planetas', simulateDelay, (req, res) => {
    res.json(planetas);
});

/**
 * Crea una nueva planeta
 */
app.post('/planetas', simulateDelay, (req, res) => {
    const nuevoPlaneta = req.body;
    console.log(nuevoPlaneta);
    nuevoPlaneta.id = planetas.length + 1;
    planetas.push(nuevoPlaneta);
    res.status(200).json(nuevoPlaneta);
});

/**
 * Obtiene planeta por ID
 */
app.get('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const planeta = planetas.find(p => p.id === id);
    if (planeta) {
        res.json(planeta);
    } else {
        res.status(404).send('planeta no encontrado');
    }
});

/**
 * Edita planeta por ID
 */
app.put('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = planetas.findIndex(p => p.id === id);
    if (index !== -1) {
        const newObj = req.body;
        newObj.id = id;
        planetas[index] = newObj;
        
        res.json(newObj);
    } else {
        res.status(404).send('planeta no encontrado');
    }
});

/**
 * Elimina planeta por ID
 */
app.delete('/planetas/:id', simulateDelay, (req, res) => {
    const id = parseInt(req.params.id);
    const index = planetas.findIndex(p => p.id === id);
    if (index !== -1) {
        planetas.splice(index, 1);
        res.status(200).send();
    } else {
        res.status(404).send('planeta no encontrado');
    }
});

/**
 * Elimina todas los planetas
 */
app.delete('/planetas', simulateDelay, (req, res) => {
    planetas = [];
    res.status(200).send('Todas los planetas han sido eliminadas');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});