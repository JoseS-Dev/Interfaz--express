import { connection } from "./db/Connection.mjs";

export class ModelsTypography {
    // Obtener todas las tipografias
    static async getAll(){
        const [tipographies] = await connection.query('SELECT * FROM typography');
        if(tipographies.length > 0){
            console.log('Tipografías encontradas');
            return tipographies;
        }
        else{
            console.log('No se encontraron tipografías');
            return [];
        }
    }
    
    
    // Obtener una tipografia por su ID
    static async getByID({ id_tipography}){
        if(id_tipography){
            const [tipography] = await connection.query('SELECT * FROM typography WHERE id_tipography = ?', [id_tipography]);
            if(tipography.length > 0){
                console.log('Tipografía encontrada');
                return tipography[0];
            }
            else{
                console.log('No se encontró la tipografía');
                return null;
            }
        }
    }

    // Obtener una tipografia por su la tipografia principal
    static async getByMainName({ name_tipography_main }){
        if(name_tipography_main){
            const [tipography] = await connection.query('SELECT * FROM typegraphy WHERE name_tipography_main = ?', [name_tipography_main]);
            if(tipography.length > 0){
                console.log('Tipografía encontrada');
                return tipography[0];
            }
            else{
                console.log('No se encontró la tipografía');
                return null;
            }
        }
    }
    // Obtener una tipografia por su la tipografia secundaria
    static async getBySecondaryName({ name_tipography_secondary }){
        if(name_tipography_secondary){
            const [tipography] = await connection.query('SELECT * FROM typegraphy WHERE name_tipography_secondary = ?', [name_tipography_secondary]);
            if(tipography.length > 0){
                console.log('Tipografía encontrada');
                return tipography[0];
            }
            else{
                console.log('No se encontró la tipografía');
                return null;
            }
        }
    }
}