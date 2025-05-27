import { connection } from "./db/Connection.mjs";

export class ModelsColors {
    // Obtener todos los colores
    static async getAll(){
        const [colors] = await connection.query('SELECT * FROM colors');
        if(colors.length > 0){
            console.log('Colores obtenidos correctamente');
            return colors;
        }
        else{
            console.log('No se encontraron colores');
            return null;
        }
    }

    // Obtener un color por su ID
    static async getByID({id_colors}){
        if(id_colors){
            const [color] = await connection.query('SELECT * FROM colors WHERE id_colors = ?', [id_colors]);
            if(color.length > 0){
                console.log(`Color con ID ${id_colors} obtenido correctamente`);
                return color[0];
            }
            else{
                console.log(`No se encontró el color con ID ${id_colors}`);
                return null;
            }
        }
        else{
            console.log('ID de color no proporcionado');
            return null;
        }
    }

    // Obtener un color por su color principal
    static async getByPrimaryColor({primary_color}){
        if(primary_color){
            const [PrimaryColor] = await connection.query('SELECT * FROM colors WHERE primary_color = ?', [primary_color]);
            if(PrimaryColor.length > 0){
                console.log(`Color principal obtenido correctamente`);
                return PrimaryColor[0];
            }
            else{
                console.log(`No se encontró el color principal`);
                return null;
            }
        }
        else{
            console.log('Color principal no proporcionado');
            return null;
        }
    }

    // Obtener un color por su color secundario
    static async getBySecondaryColor({secondary_color}){
        if(secondary_color){
            const [SecondaryColor] = await connection.query('SELECT * FROM colors WHERE secondary_color = ?', [secondary_color]);
            if(SecondaryColor.length > 0){
                console.log(`Color secundario obtenido correctamente`);
                return SecondaryColor[0];
            }
            else{
                console.log(`No se encontró el color secundario`);
                return null;
            }
        }
        else{
            console.log('Color secundario no proporcionado');
            return null;
        }
    }

}