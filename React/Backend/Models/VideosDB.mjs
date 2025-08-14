import {connection} from './db/Connection.mjs';
import { promises as fs } from 'fs';
import path from 'path';

export class ModelsVideos{

    // Obtener todos los videos
    static async getAllVideos() {
        const [result] = await connection.query(
            `SELECT a.*, b.*, c.*
            FROM videos a
            LEFT JOIN audios b ON a.id_video = b.id_video
            LEFT JOIN subtitles c ON a.id_video = c.id_video
            ORDER BY a.id_video DESC`
        );
        if(result.length === 0) return {message: 'No hay videos disponibles'};
        return result;
    }
    // Obtener un video por su ID
    static async getVideoByID({id_video}){
        if(!id_video) return {message: 'El ID del video es requerido'};
        const [result] = await connection.query(`SELECT * FROM videos WHERE id_video = ?`, [id_video]);
        if(result.length === 0) return {message: 'No se encontró el video con el ID proporcionado'};
        return result[0];
    }

    // Obtener un video por su formato
    static async getVideoByFormat({format_video}){
        if(!format_video) return {message: 'El formato del video es requerido'};
        const [result] = await connection.query(`SELECT * FROM videos WHERE format_video = ?`, [format_video]);
        if(result.length === 0) return {message: 'No se encontró el video con el formato proporcionado'};
        return result;   
    }

    // Obtener un video por su tamaño
    static async getVideoBySize({size_video}){
        if(!size_video) return {message: 'El tamaño del video es requerido'};
        const [result] = await connection.query(`SELECT * FROM videos WHERE size_video = ?`, [size_video]);
        if(result.length === 0) return {message: 'No se encontró el video con el tamaño proporcionado'};
        return result[0];
    }

    // Crear un nuevo video
    static async createVideo({video, id_user}){
        if(!video) return {message: 'Los datos del video son requeridos'};
        const {name_video, format_video, duration_video, size_video, url_video} = video;
        // Se verifica si el usuario esta loguado
        const [existingUser] = await connection.query(`SELECT * FROM login_user WHERE id_user = ?`, [id_user]);
        if(existingUser.length > 0){
            // Se verfica si el video ya existe
            const [existingVideo] = await connection.query(`SELECT * FROM videos WHERE name_video = ?`, [name_video]);
            if(existingVideo.length > 0) return {message: 'El video ya existe'};
            // Se inserta el nuevo video
            const [createdVideo] = await connection.query(
                `INSERT INTO videos (id_user,name_video, format_video, duration_video, size_video, urL_video)
                VALUES (? ,?, ?, ?, ?, ?)`,
                [id_user,name_video, format_video, duration_video, size_video, url_video])
            if(createdVideo.affectedRows === 0) return {message: 'Error al crear el video'};
            console.log('Video creado correctamente');
            return {
                id_video: createdVideo.insertId,
                name_video,
                format_video,
                duration_video,
                size_video,
                url_video
            };
        }
        else{
            return {message: 'El usuario no está logueado'};
        }
    }

    // Crear un audio para un video
    static async createAudio({audio, id_video}){
        if(!audio || !id_video) return {message: 'Los datos del audio y el ID del video son requeridos'};
        const { name_audio_main, name_audio_secondary, format_audio_main, 
            format_audio_secondary, duration_audio_main,duration_audio_secondary, 
            size_audio_main, size_audio_secondary, url_audio_main, url_audio_secondary } = audio;
        
        // Se verifica si el video existe
        const [existingVideo] = await connection.query('SELECT * FROM videos WHERE id_video = ?', [id_video]);
        if(existingVideo.length > 0){
            // Se inserta el nuevo audio
            const [createdAudio] = await connection.query(
                `INSERT INTO audios (id_video, name_audio_main, name_audio_secondary, 
                format_audio_main, format_audio_secondary, duration_audio_main, 
                duration_audio_secondary, size_audio_main, size_audio_secondary, 
                url_audio_main, url_audio_secondary)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [id_video, name_audio_main, name_audio_secondary, format_audio_main,
                 format_audio_secondary, duration_audio_main, duration_audio_secondary,
                 size_audio_main, size_audio_secondary, url_audio_main, url_audio_secondary])
            if(createdAudio.affectedRows === 0) return {message: 'Error al crear el audio'};
            console.log('Audios creado correctamente');
            return {
                id_audio: createdAudio.insertId,
                name_audio_main,
                name_audio_secondary,
                format_audio_main,
                format_audio_secondary,
                duration_audio_main,
                duration_audio_secondary,
                size_audio_main,
                size_audio_secondary,
                url_audio_main,
                url_audio_secondary
            };
        }
    }
    // Crear un subtítulo para un video
    static async createSubtitle({subtitle, id_video}){
        if(!subtitle || !id_video) return { message: 'Los datos del subtítulo y el ID del video son requeridos'};
        const {subtitle_main_video, subtitle_secondary_video,
            format_subtitle_main, format_subtitle_secondary,
            size_subtitle_main, size_subtitle_secondary } = subtitle;
        
        // Se verifica si el video existe
        const [existingVideo] = await connection.query(`SELECT * FROM videos WHERE id_video = ?`, [id_video]);
        if(existingVideo.length > 0){
            // Se inserta el nuevo subtítulo
            const [createdSubtitle] = await connection.query(
                `INSERT INTO subtitles (id_video, subtitle_main_video, subtitle_secondary_video,
                format_subtitle_main, format_subtitle_secondary, size_subtitle_main, size_subtitle_secondary)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id_video, subtitle_main_video, subtitle_secondary_video,
                 format_subtitle_main, format_subtitle_secondary, size_subtitle_main, size_subtitle_secondary])
            
                 if(createdSubtitle.affectedRows === 0) return {message: 'Error al crear el subtítulo'};
            console.log('Subtítulo creado correctamente');
            return {
                id_subtitle: createdSubtitle.insertId,
                subtitle_main_video,
                subtitle_secondary_video,
                format_subtitle_main,
                format_subtitle_secondary,
                size_subtitle_main,
                size_subtitle_secondary
            };
        }
    }

    // Eliminar un video con sus audios y subtitulos
    static async deleteVideo({ id_video }) {
        if (!id_video) {
            return { error: "El ID del video es requerido", status: 400 };
        }

        const basePath = path.resolve('./uploads'); 
        const videosPath = path.join(basePath, 'videos');
        const audiosPath = path.join(basePath, 'audios');
        const subtitlesPath = path.join(basePath, 'subtitles');

        try {
            const [videoRows] = await connection.query(`SELECT name_video FROM videos WHERE id_video = ?`, [id_video]);

            if (videoRows.length === 0) {
                console.log(`No se encontró el video con ID: ${id_video}`);
                return { message: "El video no existe", status: 404 };
            }

            const [audioRows] = await connection.query(`SELECT name_audio_main, name_audio_secondary FROM audios WHERE id_video = ?`, [id_video]);

            const [subtitleRows] = await connection.query(`SELECT subtitle_main_video, subtitle_secondary_video FROM subtitles WHERE id_video = ?`, [id_video]);


            const deleteFile = async (filePath, fileName) => {
                console.log({filePath, fileName})
                if (!fileName) return; // Si no hay nombre de archivo, no hace nada
                try {
                    await fs.unlink(path.join(filePath, fileName));
                    console.log(`Archivo eliminado: ${fileName}`);
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        console.error(`Error al eliminar el archivo ${fileName}:`, err.message);
                    } else {
                        console.log(err)
                        console.log(`El archivo ${fileName} no fue encontrado en el servidor, se continúa con el proceso.`);
                    }
                }
            };

            await deleteFile(videosPath, videoRows[0].name_video);

            for (const audio of audioRows) {
                await deleteFile(audiosPath, audio.name_audio_main);
                await deleteFile(audiosPath, audio.name_audio_secondary);
            }

            for (const subtitle of subtitleRows) {
                await deleteFile(subtitlesPath, subtitle.subtitle_main_video);
                await deleteFile(subtitlesPath, subtitle.subtitle_secondary_video);
            }

            await connection.query(`DELETE FROM audios WHERE id_video = ?`, [id_video]);
            await connection.query(`DELETE FROM subtitles WHERE id_video = ?`, [id_video]);
            const [deletedVideoResult] = await connection.query(`DELETE FROM videos WHERE id_video = ?`, [id_video]);

            if (deletedVideoResult.affectedRows === 0) {
                return { message: "El video fue encontrado pero no pudo ser eliminado de la base de datos.", status: 500 };
            }

            console.log("Video y archivos asociados eliminados correctamente.");
            return { message: "Video y archivos asociados eliminados correctamente.", status: 200 };

        } catch (dbError) {
            console.error("Error en el proceso de eliminación del video:", dbError);
            return { error: "Ocurrió un error en el servidor al intentar eliminar el video.", status: 500 };
        }
    }

    // Actualización parcial de un video
    static async updateVideo(id_video, videoData) {
        if (!id_video) return { message: 'El ID del video es requerido' };
        if (!videoData || Object.keys(videoData).length === 0) return { message: 'No hay campos para actualizar' };

        // Dinámicamente armar el SET
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(videoData)) {
        fields.push(`${key} = ?`);
        values.push(value);
        }
        values.push(id_video);

        const [result] = await connection.query(
        `UPDATE videos SET ${fields.join(', ')} WHERE id_video = ?`,
        values
        );
        if (result.affectedRows === 0) return { message: 'No se pudo actualizar el video' };
        return { message: 'Video actualizado correctamente' };
    }

    // Actualización parcial de audio principal y/o secundario
    static async updateAudio(id_video, audioData) {
        if (!id_video) return { message: 'El ID del video es requerido' };
        if (!audioData || Object.keys(audioData).length === 0) return { message: 'No hay campos para actualizar' };

        // Dinámicamente armar el SET
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(audioData)) {
        fields.push(`${key} = ?`);
        values.push(value);
        }
        values.push(id_video);

        const [result] = await connection.query(
        `UPDATE audios SET ${fields.join(', ')} WHERE id_video = ?`,
        values
        );
        if (result.affectedRows === 0) {
        // Si no existe, podrías insertar (opcional)
        return { message: 'No se pudo actualizar el audio. ¿Existe registro para este video?' };
        }
        return { message: 'Audio actualizado correctamente' };
    }

    // Actualización parcial de subtítulos principal y/o secundario
    static async updateSubtitle(id_video, subtitleData) {
        if (!id_video) return { message: 'El ID del video es requerido' };
        if (!subtitleData || Object.keys(subtitleData).length === 0) return { message: 'No hay campos para actualizar' };

        console.log({subtitleData})
        // Dinámicamente armar el SET
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(subtitleData)) {
        fields.push(`${key} = ?`);
        values.push(value);
        }
        values.push(id_video);

        const [result] = await connection.query(
        `UPDATE subtitles SET ${fields.join(', ')} WHERE id_video = ?`,
        values
        );
        if (result.affectedRows === 0) {
        // Si no existe, podrías insertar (opcional)
        return { message: 'No se pudo actualizar el subtítulo. ¿Existe registro para este video?' };
        }
        return { message: 'Subtítulos actualizados correctamente' };
    }

    // Actualizar selección de video
    static async updateVideoSelection({ id_video, is_selected }) {
        if (!id_video) return { message: 'El ID del video es requerido' };
        if (is_selected !== 0 && is_selected !== 1) return { message: 'El is_selected debe ser 0 o 1' };

        const [result] = await connection.query(
            `UPDATE videos SET is_selected = ? WHERE id_video = ?`,
            [is_selected, id_video]
        );

        if (result.affectedRows === 0) return { message: 'No se encontró el video para actualizar' };
        return { message: 'is_selected actualizado correctamente' };
    }

    // Función auxiliar
    static async getAssetPathsById({ id_video }) {
        if (!id_video) return null;

        const [videoRows] = await connection.query(`SELECT name_video FROM videos WHERE id_video = ?`, [id_video]);
        const [audioRows] = await connection.query(`SELECT name_audio_main, name_audio_secondary FROM audios WHERE id_video = ?`, [id_video]);
        const [subtitleRows] = await connection.query(`SELECT subtitle_main_video, subtitle_secondary_video FROM subtitles WHERE id_video = ?`, [id_video]);

        const names = {
            video: videoRows.length > 0 ? videoRows[0].name_video : null,
            audioMain: audioRows.length > 0 ? audioRows[0].name_audio_main : null,
            audioSecondary: audioRows.length > 0 ? audioRows[0].name_audio_secondary : null,
            subtitleMain: subtitleRows.length > 0 ? subtitleRows[0].subtitle_main_video : null,
            subtitleSecondary: subtitleRows.length > 0 ? subtitleRows[0].subtitle_secondary_video : null,
        };
        return names;
    }
}