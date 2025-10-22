//Importar el modelo de superheroes
import SuperHero from '../models/SuperHero.mjs'; 
//Importar abstracción de los metodos CRUD
import IRepository from './IRepository.mjs';

//Clase SuperHeroRepository que hereda de IRepository
class SuperHeroRepository extends IRepository {
    async obtenerPorId(id){
        //devuelve un superhéroe con el id enviado
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor){
        return await SuperHero.find({[atributo]: valor});
    }

    async obtenerMayoresDe30(){
        
        //Heroes mayores de 30 años de la Tierra
        return await SuperHero.find({
            //$gt: greater than/mayor que
            edad: {$gt: 30},
            planetaOrigen: "Tierra",
            $expr: { $gte: [{ $size: "$poderes" }, 2] }
            /**
             * $expr: permite usar expresiones de agregación
             * $size: cuenta la cantidad de elementos en poderes
             * $gte: greater than or equal, revisa que sea mayor o igual que 2
             */
        });
        //ejemplo en mongoDB compass {edad:{$gt: 25}, planetaOrigen: "Tierra"}

    }

    async crearNuevoSuperHeroe(datosSuperHeroe){
        console.log(datosSuperHeroe);

        const superHeroe = await SuperHero.create(
            {
                nombreSuperHeroe: datosSuperHeroe.nombreSuperHeroe,
                nombreReal: datosSuperHeroe.nombreReal,
                edad: datosSuperHeroe.edad,
                planetaOrigen: datosSuperHeroe.planetaOrigen,
                debilidad: datosSuperHeroe.debilidad,
                poderes: datosSuperHeroe.poderes,
                aliados: datosSuperHeroe.aliados,
                enemigos: datosSuperHeroe.enemigos,
                creador: datosSuperHeroe.creador,
            }
        )
        return superHeroe;
    }
}

export default new SuperHeroRepository();