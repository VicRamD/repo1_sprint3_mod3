import {obtenerSuperheroePorId, obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30} from '../services/superheroesService.mjs';

import {renderizarSuperheroe, renderizarListaSuperheroes} from '../views/responseView.mjs';

export const obtenerSuperheroePorIdController = async (req, res) => {
    try {
        const {id} = req.params;
        //console.log(id);
        const superheroe = await obtenerSuperheroePorId(id); 
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }    

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener supehéroe',
            error: error.message
        });
    }
}

export const obtenerTodosLosSuperheroesController = async (req, res) => {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los superhéroes',
            error: error.message
        });
    }
}

export const buscarSuperheroesPorAtributoController = async (req, res) => {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);    
        
        if(superheroes.length === 0){
            return res.status(404).send(
                {mensaje:"No se encontraron superhéroes con ese atributo"}
            );
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al buscar los superhéroes',
            error: error.message
        });
    }
    
}

export const obtenerSuperheroesMayoresDe30Controller = async (req, res) => {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length===0){
            res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }

        const superheroeFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroeFormateados);

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message
        });
    }
}