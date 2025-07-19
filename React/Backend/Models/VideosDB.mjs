import {connection} from './db/Connection.mjs';

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
}