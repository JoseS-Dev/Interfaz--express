import { connection } from "./db/Connection.mjs";

export class ModelsImages {
    // Obtener todas las imagenes
    static async getAllImages(){
        const [results] = await connection.query('SELECT * FROM images');
        if(results.length < 0) return {message: "No hay imagenes en la base de datos"};
        return results;
    }

    // Obtener una image por su ID
    static async getImageByID({id_image}){
        if(!id_image) return {message: "El ID de la imagen es requerido"};
        const [results] = await connection.query(`SELECT * FROM images WHERE id_image = ?`, [id_image]);
        if(results.length === 0) return {message: "No se encontró la imagen con el ID proporcionado"};
        console.log("Imaage eoncotrada por su ID");
        return results[0];
    }

    // Obtener una image por su formato
    static async getImageByFormat({format_image}){
        if(!format_image) return {message: "El fromato de la imagen es requerido"};
        const [results] = await connection.query(`SELECT * FROM images WHERE format_image = ?`, [format_image]);
        if(results.length === 0) return {message: "No se encontró la imagen con el formato proporcionado"};
        console.log("Imagen encontrada por su formato");
        return results;
    }

    // Obtener una image por su tamaño
    static async getImageBySize({size_image}){
        if(!size_image) return { message: "El tamaño de la imagen es requerido" };
        const [results] = await connection.query(`SELECT * FROM images WHERE size_image = ?`, [size_image]);
        if(results.length === 0) return {message: "No se encontró la imagen con el tamaño proporcionado"};
        console.log("Imagen encontrada por su tamaño");
        return results;
    }

    // Crear una nueva imagen
    static async createImage({image, id_user}){
        if(!image && !id_user) return {message: "La imagen es requerida"};
        const { name_image, format_image, size_image, dimension_image, url_image} = image;
        // Se verifica si el usuario esta loguado
        const [ExistingUser] = await connection.query('SELECT * FROM login_user  WHERE id_user = ?', [id_user]);
        if(ExistingUser.length > 0){
            console.log("Usuario encontrado, se procede a crear la imagen");
            // Primero se verifica si la image ya existe
            const [ExisitingImage] = await connection.query(`SELECT * FROM images WHERE name_image = ?`, [name_image]);
            if(ExisitingImage.affectedRows > 0){
                console.log("Ya existe la imagen con el nombre proporcionado");
                return {message: "Ya existe una imagen con el nombre proporcionado"};
            }
            else{
                // Se crea la imagen
                const [result] = await connection.query(
                    `INSERT INTO images (id_user, name_image, format_image, size_image, dimension_image, url_image, is_selected)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [id_user, name_image, format_image, size_image, dimension_image, url_image, false]
                )
                if(result.affectedRows < 0) return {message: "No se pudo crear la imagen"};
                console.log("Imagen creada correctamente");
                return {
                    id_image: result.insertId,
                    name_image,
                    format_image,
                    size_image,
                    dimension_image,
                    url_image 
                };
            }
        }

    }

    // Actualizar una imagen
    static async updateImage({id_image, image}){
        if(!id_image || !image) return {message: "El ID de la imagen y la imagen son requeridos"};
        const {name_image, format_image, size_image, dimension_image, url_image} = image;
        // Se verifica si la image existe
        const [ExistingImage] = await connection.query('SELECT * FROM images WHERE id_image = ?', [id_image]);
        if(ExistingImage.length === 0) return {message: "No se encontró la imagen con el ID proporcionado"};

        // Se actualiza la imagen
        const [result] = await connection.query(
            `UPDATE images SET name_image = ?, format_image = ?, size_image = ?, dimension_image = ?, url_image = ? WHERE id_image = ?`,
            [name_image, format_image, size_image, dimension_image, url_image ,id_image]
        )
        if(result.affectedRows === 0) return {message: "No se pudo actualizar la imagen"};
        console.log("Imagen actualizada correctamente");
        return {
            id_image,
            name_image,
            format_image,
            size_image,
            dimension_image,
            url_image
        };
    }

    // Eliminar una imagen por su ID
    static async deleteImage({id_image}){
        if(!id_image) return {message: "El ID de la imagen es requerido"};
        // Se verifica si la imagen existe
        const [ExistingImage] = await connection.query('SELECT * FROM images WHERE id_image = ?', [id_image]);
        if(ExistingImage.length > 0){
             // Se elimina la imagen
            const [result] = await connection.query('DELETE FROM images WHERE id_image = ?', [id_image]);
            if(result.affectedRows <= 0) return {message: "No se pudo eliminar la imagen"};
            console.log("Imagen eliminada correctamente");
            return { message: "Imagen eliminada correctamente", id_image };
        }
    }

    // Seleccionar una imagen por su ID
    static async selectImage({id_image, is_selected}){
        if(!id_image) return {message: "El ID de la image o el booleno no fue propocionado"};
        if(is_selected === undefined || is_selected === null) return {message: "is_selecte debe ser 0 o 1"};
        // Se selecciona la image
        const [selectedImage] = await connection.query(
            `UPDATE images SET is_selected = ? WHERE id_image = ?`,
            [is_selected, id_image]
        )
        if(selectedImage.length === 0) return {message: "Hubo un error a la hora de seleccionar la imagen"}
        console.log("is_selected ha sido cambiado exitosamente");
        return {message: "is_selected ha sido cambiado exitosamente"} 
    };
    
    // Obtener todas las imagenes seleccionadas
    static async getAllSelected(){
        const [AllSelected] = await connection.query(
            `SELECT * FROM images WHERE is_selected = 1`
        );
        if(AllSelected.length === 0) return {message: 'No hay imagenes seleccionadas'};
        return AllSelected;
    }
}