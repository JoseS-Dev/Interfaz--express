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
    
    // Obtener la tipografia seleccionada por el usuario
    static async getSelectedTypography({ id_user }) {
        const query = `
            SELECT t.*
            FROM typography t
            JOIN typography_relationship tr ON t.id_tipography = tr.id_tipography
            WHERE tr.id_user = ? AND t.is_selected = true
        `;
    
        const [rows] = await connection.query(query, [id_user]);
    
        if (rows.length > 0) {
            console.log('Tipografía encontrada');
            return rows[0];
        } else {
            console.log('No se encontró la tipografía');
            return null;
        }
    }
    

    // Obtener una tipografia por su  tipografia principal
    static async getByMainName({ name_tipography_main }){
        if(name_tipography_main){
            const [tipography] = await connection.query('SELECT * FROM typography WHERE name_tipography_main = ?', [name_tipography_main]);
            if(tipography.length > 0){
                console.log('Tipografía encontrada');
                return tipography;
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
                return tipography;
            }
            else{
                console.log('No se encontró la tipografía');
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
                return TipographyParagraph;
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
                return TipographyTitle;
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
                return TipographySubtitle;
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
                return tipography;
            }
            else{
                console.log('No se encontró la tipografía por archivo de fuente');
                return null;
            }
        }
    }

    // Crear una nueva tipografia con su Tipografia principal
    static async createTipographyMain({ typography, id_user }){
        if(typography){
            const { name_tipography_main, tam_paragraph, tam_title, tam_subtitle, archive_font } = typography;
            // Se crea la nueva tipografia
            const [result] = await connection.query('INSERT INTO typography (name_typography_main, tam_paragraph, tam_title, tam_subtitle, archive_font_main) VALUES (?, ?, ?, ?, ?)', 
                [name_tipography_main, tam_paragraph, tam_title, tam_subtitle, archive_font]);
            
            if(result.affectedRows > 0){
                // Se relaciona con la tabla de la relacion
                const [relationResult] = await connection.query('INSERT INTO typography_relationship (id_tipography,id_user) VALUES (?,?)', [result.insertId, id_user]);
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
    static async createTipographySecondary({ typography, id_user }){
        if(typography){
            const {name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle, archive_font} = typography;
            // Se crea la nueva tipografia
            const [result] = await connection.query('INSERT INTO typography (name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle, archive_font_secondary) VALUES (?, ?, ?, ?, ?)', 
                [name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle, archive_font]);
            if(result.affectedRows > 0){
                // Se relaciona con la tabla de la relacion
                const [relationResult] = await connection.query('INSERT INTO typography_relationship (id_tipography, id_user) VALUES (?,?)', [result.insertId, id_user]);
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
    static async createTipography({ typography, id_user }){
        if(typography){
            const { name_tipography_main, name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle,is_selected,archive_font_main, archive_font_secondary } = typography;
            // Se crea la nueva tipografia
            const [result] = await connection.query('INSERT INTO typography (name_tipography_main, name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle,is_selected,archive_font_main, archive_font_secondary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [name_tipography_main, name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle, is_selected,archive_font_main, archive_font_secondary]);
            if(result.affectedRows > 0){
                // Se relaciona con la tabla de la relacion
                const [relationResult] = await connection.query('INSERT INTO typography_relationship (id_tipography,id_user) VALUES (?,?)', [result.insertId, id_user]);
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
            const { name_tipography_main, name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle,is_selected,archive_font_main, archive_font_secondary } = typography;
            // Se actualiza la tipografia
            const [result] = await connection.query('UPDATE typography SET name_tipography_main = ?, name_tipography_secondary = ?, tam_paragraph = ?, tam_title = ?, tam_subtitle = ?, is_selected = ?,archive_font_main = ?, archive_font_secondary = ? WHERE id_tipography = ?', 
                [name_tipography_main, name_tipography_secondary, tam_paragraph, tam_title, tam_subtitle, is_selected,archive_font_main, archive_font_secondary, id_tipography]);
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
            const [relationResult] = await connection.query('DELETE FROM typography_relationship WHERE id_tipography = ?', [id_tipography]);
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

    // Seleccionar una tipografía para un usuario
    static async selectTypography({ id_user, id_tipography }) {
        // Deseleccionar todas las tipografías relacionadas con el usuario
        console.log('Deseleccionando todas las tipografías para el usuario:', id_user);
        console.log({ id_user, id_tipography });
        await connection.query(
            `UPDATE typography t
             JOIN typography_relationship tr ON t.id_tipography = tr.id_tipography
             SET t.is_selected = false
             WHERE tr.id_user = ?`,
            [id_user]
        );
    
        // Seleccionar la tipografía indicada para el usuario
        const [result] = await connection.query(
            `UPDATE typography t
             JOIN typography_relationship tr ON t.id_tipography = tr.id_tipography
             SET t.is_selected = true
             WHERE tr.id_user = ? AND t.id_tipography = ?`,
            [id_user, id_tipography]
        );
    
        if (result.affectedRows > 0) {
            const [rows] = await connection.query(
                `SELECT t.* FROM typography t WHERE t.id_tipography = ?`,
                [id_tipography]
            );
            return rows[0];
        } else {
            return null;
        }
    }
    
}