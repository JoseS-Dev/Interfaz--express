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

    // Obtener una tipografia por su  tipografia principal
    static async getByMainName({ name_tipography_main }){
        if(name_tipography_main){
            const [tipography] = await connection.query('SELECT * FROM typography WHERE name_tipography_main = ?', [name_tipography_main]);
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
            const [tipography] = await connection.query('SELECT * FROM typography WHERE name_tipography_secondary = ?', [name_tipography_secondary]);
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
            const [tipographyFont] = await connection.query('SELECT * FROM typography WHERE tam_font = ?', [tam_font]);
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
            const [TipographyParagraph] = await connection.query('SELECT * FROM typography WHERE tam_paragraph = ?', [tam_paragraph]);
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
            const [TipographyTitle] = await connection.query('SELECT * FROM typography WHERE tam_title = ?', [tam_title]);
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
    
    // Obtener una tipografia por su tamaño de font en los subtitulos
    static async getByFontSubTitle({ tam_subtitle }){
        if(tam_subtitle){
            const [TipographySubtitle] = await connection.query('SELECT * FROM typography WHERE tam_subtitle = ?', [tam_subtitle]);
            if(TipographySubtitle.length > 0){
                console.log('Tipografía encontrada por tamaño de subtítulo');
                return TipographySubtitle[0];
            }
            else{
                console.log('No se encontró la tipografía por tamaño de subtítulo');
                return null;
            }
        }
    }
    
    // Obtener una tipografia por su .tff
    static async getByArchiveFont({ archive_font }){
        if(archive_font){
            const [tipography] = await connection.query('SELECT * FROM typography WHERE archive_font = ?', [archive_font]);
            if(tipography.length > 0){
                console.log('Tipografía encontrada por archivo de fuente');
                return tipography[0];
            }
            else{
                console.log('No se encontró la tipografía por archivo de fuente');
                return null;
            }
        }
    }

    // Crear una nueva tipografia con su Tipografia principal
    static async createTipographyMain({ typography }){
        if(typography){
            const { name_tipography_main, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font } = typography;
            // Se crea la nueva tipografia
            const [result] = await connection.query('INSERT INTO typography (name_tipography_main, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font) VALUES (?, ?, ?, ?, ?, ?)', 
                [name_tipography_main, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font]);
            
            if(result.affectedRows > 0){
                // Se relaciona con la tabla de la relacion
                const [relationResult] = await connection.query('INSERT INTO typography_relationship (id_tipography) VALUES (?)', [result.insertId]);
                if(relationResult.affectedRows > 0){
                    console.log('Tipografia creada y relacionada exitosamente');
                    return result;
                }
                else{
                    console.log('Error al relacionar la tipografia');
                    return null;
                }
            }
        }
    }
    
    // Crear una nueva tipografia con su Tipografia secundaria
    static async createTipographySecondary({ typography }){
        if(typography){
            const { name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font } = typography;
            // Se crea la nueva tipografia
            const [result] = await connection.query('INSERT INTO typography (name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font) VALUES (?, ?, ?, ?, ?, ?)', 
                [name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font]);
            if(result.affectedRows > 0){
                // Se relaciona con la tabla de la relacion
                const [relationResult] = await connection.query('INSERT INTO typography_relationship (id_tipography) VALUES (?)', [result.insertId]);
                if(relationResult.affectedRows > 0){
                    console.log('Tipografia creada y relacionada exitosamente');
                    return result;
                }
                else{
                    console.log('Error al relacionar la tipografia');
                    return null;
                }
            }
        }
    }

    // Se crea una tipografia con su Tipografia principal y secundaria
    static async createTipography({ typography }){
        if(typography){
            const { name_tipography_main, name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font } = typography;
            // Se crea la nueva tipografia
            const [result] = await connection.query('INSERT INTO typography (name_tipography_main, name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                [name_tipography_main, name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font]);
            if(result.affectedRows > 0){
                // Se relaciona con la tabla de la relacion
                const [relationResult] = await connection.query('INSERT INTO typography_relationship (id_tipography) VALUES (?)', [result.insertId]);
                if(relationResult.affectedRows > 0){
                    console.log('Tipografia creada y relacionada exitosamente');
                    return result;
                }
                else{
                    console.log('Error al relacionar la tipografia');
                    return null;
                }
            }
        }
    }

    // Actualizar una tipografia por su ID
    static async updateByID({id_tipography, typography}){
        if(id_tipography && typography){
            const { name_tipography_main, name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font } = typography;
            // Se actualiza la tipografia
            const [result] = await connection.query('UPDATE typography SET name_tipography_main = ?, name_tipography_secondary = ?, tam_font = ?, tam_paragraph = ?, tam_title = ?, tam_subtitle = ?, archive_font = ? WHERE id_tipography = ?', 
                [name_tipography_main, name_tipography_secondary, tam_font, tam_paragraph, tam_title, tam_subtitle, archive_font, id_tipography]);
            if(result.affectedRows > 0){
                console.log('Tipografía actualizada exitosamente');
                return result;
            }
            else{
                console.log('No se actualizó la tipografía');
                return null;
            }
        }
    }

    // Eliminar una tipografia por su ID
    static async deleteByID({ id_tipography }){
        if(id_tipography){
            // Primero eliminamos la relacion de la tipografia
            const [relationResult] = await connection.query('DELETE FROM typography_relationship WHERE id_relation = ?', [id_tipography]);
            if(relationResult.affectedRows > 0){
                // Luego eliminamos la tipografia
                const [resultDelete] = await connection.query('DELETE FROM typography WHERE id_tipography = ?', [id_tipography]);
                if(resultDelete.affectedRows > 0){
                    console.log('Tipografía eliminada exitosamente');
                    return resultDelete;
                }
                else{
                    console.log('No se eliminó la tipografía o ya no queda más tipografia a eliminar');
                    return null;
                }
            }
        }
    }
}