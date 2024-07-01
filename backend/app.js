const cors = require('cors'); // Importa el paquete cors
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let planetas = [
    {
      id: 1,
      nombre: "Mercurio",
      tamanio: 4879,
      masa: 0.33,
      tipo: "Rocoso",
      distancia: 57.9,
      anillo: false,
      vida: false,
      compAtmosfera: "Oxígeno, Sodio, Hidrógeno",
    },
    {
      id: 2,
      nombre: "Venus",
      tamanio: 12104,
      masa: 4.87,
      tipo: "Rocoso",
      distancia: 108.2,
      anillo: false,
      vida: false,
      compAtmosfera: "Dióxido de carbono, Nitrógeno",
    },
    {
      id: 3,
      nombre: "Tierra",
      tamanio: 12742,
      masa: 5.97,
      tipo: "Rocoso",
      distancia: 149.6,
      anillo: false,
      vida: true,
      compAtmosfera: "Nitrógeno, Oxígeno",
    },
    {
      id: 4,
      nombre: "Marte",
      tamanio: 6779,
      masa: 0.642,
      tipo: "Rocoso",
      distancia: 227.9,
      anillo: false,
      vida: false,
      compAtmosfera: "Dióxido de carbono, Nitrógeno, Argón",
    },
    {
      id: 5,
      nombre: "Júpiter",
      tamanio: 139820,
      masa: 1898,
      tipo: "Gaseoso",
      distancia: 778.3,
      anillo: true,
      vida: false,
      compAtmosfera: "Hidrógeno, Helio",
    },
    {
      id: 6,
      nombre: "Saturno",
      tamanio: 116460,
      masa: 568,
      tipo: "Gaseoso",
      distancia: 1427,
      anillo: true,
      vida: false,
      compAtmosfera: "Hidrógeno, Helio",
    },
    {
      id: 7,
      nombre: "Urano",
      tamanio: 50724,
      masa: 86.8,
      tipo: "Gaseoso",
      distancia: 2871,
      anillo: true,
      vida: false,
      compAtmosfera: "Hidrógeno, Helio, Metano",
    },
    {
      id: 8,
      nombre: "Neptuno",
      tamanio: 49244,
      masa: 102,
      tipo: "Gaseoso",
      distancia: 4495,
      anillo: true,
      vida: false,
      compAtmosfera: "Hidrógeno, Helio, Metano",
    },
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