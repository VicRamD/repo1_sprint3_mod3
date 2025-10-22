import express from 'express';

import {obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller,
    crearNuevoSuperHeroeController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

//get espera una ruta y un handler/manejador

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//crear un nuevo heroe
router.post('/heroes', crearNuevoSuperHeroeController);

//heroes/:id se dejó para el final para evitar que al escribir /mayores-30 lo interprete como un id
router.get('/heroes/:id', obtenerSuperheroePorIdController);
//http://localhost:3000/api/heroes/68f28aa5653a5ddc12de3b02



export default router;
