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

    // Obtener una tipografia por su tamaño de font
    static async getByFontSize({ tam_font }){
        if(tam_font){
            const [tipographyFont] = await connection.query('SELECT * FROM typegraphy WHERE tam_font = ?', [tam_font]);
            if(tipographyFont.length > 0){
                console.log('Tipografía encontrada por tamaño de fuente');
                return tipographyFont[0];
            }
            else{
                console.log('No se encontró la tipografía por tamaño de fuente');
                return null;
            }
        }
    }

    // Obtener una tipografia por su tamaño de font en los parrafos
    static async getByFontParagraph({ tam_paragraph }){
        if(tam_paragraph){
            const [TipographyParagraph] = await connection.query('SELECT * FROM typegraphy WHERE tam_paragraph = ?', [tam_paragraph]);
            if(TipographyParagraph.length > 0){
                console.log('Tipografía encontrada por tamaño de párrafo');
                return TipographyParagraph[0];
            }
            else{
                console.log('No se encontró la tipografía por tamaño de párrafo');
                return null;
            }
        }
    }
    // Obtener una tipografia por su tamaño de font en los titulos
    static async getByFontTitle({ tam_title }){
        if(tam_title){
            const [TipographyTitle] = await connection.query('SELECT * FROM typegraphy WHERE tam_title = ?', [tam_title]);
            if(TipographyTitle.length > 0){
                console.log('Tipografía encontrada por tamaño de título');
                return TipographyTitle[0];
            }
            else{
                console.log('No se encontró la tipografía por tamaño de título');
                return null;
            }
        }
    }
}