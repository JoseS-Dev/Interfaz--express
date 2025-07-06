import { connection } from "./db/Connection.mjs";

export class ModelsColors {
    // Obtener todos los conjuntos de  colores
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

    // Obtener un color seleccionado por el usuario
    static async getSelectedColors({ id_user }) {
        const query = `
            SELECT c.*
            FROM colors c
            JOIN colors_relationship cr ON c.id_colors = cr.id_colors
            WHERE cr.id_user = ? AND c.is_selected = true
            LIMIT 1
        `;
    
        const [rows] = await connection.query(query, [id_user]);
    
        if (rows.length > 0) {
            console.log('Colores encontrados');
            return rows[0];
        } else {
            console.log('No se encontraron colores');
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
                return SecondaryColor;
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

    // Obtener un color por su color terciario
    static async getByTernaryColor({ternary_color}){
        if(ternary_color){
            const [TernaryColor] = await connection.query('SELECT * FROM colors WHERE ternary_color = ?', [ternary_color]);
            if(TernaryColor.length > 0){
                console.log(`Color terciario obtenido correctamente`);
                return TernaryColor;
            }
            else{
                console.log(`No se encontró el color terciario`);
                return null;
            }
        }
        else{
            console.log('Color terciario no proporcionado');
            return null;
        }
    }

    // Obtener un color por su color cuaternario
    static async getByCuaternaryColor({cuarternary_color}){
        if(cuarternary_color){
            const [CuarternaryColor] = await connection.query('SELECT * FROM colors WHERE cuaternary_color = ?', [cuarternary_color]);
            if(CuarternaryColor.length > 0){
                console.log(`Color cuaternario obtenido correctamente`);
                return CuarternaryColor;
            }
            else{
                console.log(`No se encontró el color cuaternario`);
                return null;
            }
        }
        else{
            console.log('Color cuaternario no proporcionado');
            return null;
        }
    }

    // Obtener un color por su color neutral (Blanco o Negro)
    static async getByNeutralColor({neutral_color}){
        if(neutral_color){
            const[neutralColor] = await connection.query('SELECT * FROM colors WHERE neutral_color = ?', [neutral_color]);
            if(neutralColor.length){
                console.log('Color neutral obtenidos correctamente');
                return neutralColor;
            }
        }
        else{
            console.log('No se propociono el color neutro')
            return null;
        }
    }

    // Crear un Color
    static async createColor({color, id_user}){
        if(color){
            const {primary_color,secondary_color,ternary_color,cuarternary_color,neutral_color, is_selected} = color
            // Se agrega el nuevo color
            const [newColor] = await connection.query('INSERT INTO colors(primary_color,secondary_color,ternary_color,cuarternary_color,neutral_color, is_selected) VALUES(?,?,?,?,?,?)',[
                primary_color,secondary_color,ternary_color,cuarternary_color,neutral_color, is_selected])
            
            if(newColor.affectedRows > 0){
                // Se relaciona con su tabla de relación
                const [relation] = await connection.query('INSERT INTO colors_relationship(id_colors, id_user) VALUES(?,?)', [newColor.insertId, id_user]);
                if(relation.affectedRows > 0){
                    console.log('Color creado correctamente');
                    return newColor;
                }
                else{
                    console.log('Error al relacionar el color');
                    return null;
                }
            }
        }
    }

    // Actualizar un color por su ID
    static async updateByID({id_colors,color}){
        if(id_colors && color){
            const {primary_color,secondary_color,ternary_color,cuarternary_color,neutral_color, is_selected} = color;
            const [updatedColor] = await connection.query('UPDATE colors SET primary_color = ?, secondary_color = ?, ternary_color = ?, cuarternary_color = ?, neutral_color = ?, is_selected = ? WHERE id_colors = ?', [
                primary_color,secondary_color,ternary_color,cuarternary_color,neutral_color,is_selected,id_colors
            ]);
            if(updatedColor.affectedRows > 0){
                console.log(`Color con ID ${id_colors} actualizado correctamente`);
                return updatedColor;
            }
            else{
                console.log(`No se encontró el color con ID ${id_colors}`);
                return null;
            }
        }
        else{
            console.log('ID de color o datos de color no proporcionados');
            return null;
        }
    }

    // Eliminar un color por su ID
    static async deleteByID({id_colors}){
        if(id_colors){
            // Primero se elimina la relación del color
            const [relationDeleted] = await connection.query('DELETE  FROM colors_relationship WHERE id_colors = ?', [id_colors]);
            if(relationDeleted.affectedRows > 0){
                // Luego se elimina el color
                const [deletedColor] = await connection.query('DELETE FROM colors WHERE id_colors = ?', [id_colors]);
                if(deletedColor.affectedRows > 0){
                    console.log(`Color con ID ${id_colors} eliminado correctamente`);
                    return deletedColor;
                }
                else{
                    console.log(`No se encontró el color con ID ${id_colors}`);
                    return null;
                }
            }
            else{
                console.log(`No se encontró la relación del color con ID ${id_colors}`);
                return null;
            }
        }
    }

    static async selectColor({ id_user, id_colors }) {
        // Deseleccionar todos los colores relacionados con el usuario
        await connection.query(
            `UPDATE colors c
             JOIN colors_relationship cr ON c.id_colors = cr.id_colors
             SET c.is_selected = false
             WHERE cr.id_user = ?`,
            [id_user]
        );
    
        // Seleccionar el color indicado para el usuario
        const [result] = await connection.query(
            `UPDATE colors c
             JOIN colors_relationship cr ON c.id_colors = cr.id_colors
             SET c.is_selected = true
             WHERE cr.id_user = ? AND c.id_colors = ?`,
            [id_user, id_colors]
        );
    
        if (result.affectedRows > 0) {
            const [rows] = await connection.query(
                `SELECT c.* FROM colors c WHERE c.id_colors = ?`,
                [id_colors]
            );
            return rows[0];
        } else {
            return null;
        }
    }
    
}