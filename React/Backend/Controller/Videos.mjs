import { validateVideoData, validateVideoUpdateData, validateAudioData, validateSubtitleData } from "../Validations/SchemaVideos.mjs";
import { parseFile } from 'music-metadata'
import ffmpeg from 'fluent-ffmpeg';
import ffprobeStatic from 'ffprobe-static';

ffmpeg.setFfprobePath(ffprobeStatic.path);

const getDurationInSeconds = (filePath) =>
  new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata.format.duration);
    });
  });


export class ControllerVideos{
    constructor({ModelsVideos}){
        this.ModelsVideos = ModelsVideos;
    }

    // Obtener todos los videos
    getAllVideos = async (req, res) => {
        try{
            const videos = await this.ModelsVideos.getAllVideos();
            return res.status(200).json({
                message: 'Lista de videos obtenida correctamente',
                data: videos
            })
        }
        catch(error){
            console.error('Error al obtener los videos:', error);
            return res.status(500).json({
                message: 'Error al obtener los videos',
                error: error.message
            });
        }
    }

    // Obtener un video por su ID
    getVideosByID = async (req, res) => {
        const {id_video} = req.params;
        try{
            const video = await this.ModelsVideos.getVideosByID({id_video});
            if(video){
                return res.status(200).json({
                    message: 'Video obtenido correctamente',
                    data: video
                });
            }
        }
        catch(error){
            console.error('Error al obtener el video por ID:', error);
            return res.status(500).json({
                message: 'Error al obtener el video por ID',
                error: error.message
            });
        }
    }

    // Obtener un video por su formato
    getVideosByFormat = async (req, res) => {
        const {format_video} = req.params;
        try{
            const video = await this.ModelsVideos.getVideosByFormat({format_video});
            if(video){
                return res.status(200).json({
                    message: 'Video obtenido correctamente',
                    data: video
                });
            }
        }
        catch(error){
            console.error('Error al obtener el video por formato:', error);
            return res.status(500).json({
                message: 'Error al obtener el video por formato',
                error: error.message
            });
        }
    }

    // Obtener un video por su tamaño
    getVideoBySize = async (req, res) => {
        const {size_video} = req.params;
        try{
            const video = await this.ModelsVideos.getVideoBySize({size_video});
            if(video){
                return res.status(200).json({
                    message: 'Video obtenido correctamente',
                    data: video
                });
            }
        }
        catch(error){
            console.error('Error al obtener el video por tamaño:', error);
            return res.status(500).json({
                message: 'Error al obtener el video por tamaño',
                error: error.message
            });
        }
    }

    // Crear un nuevo video
    createVideo = async (req, res) => {
        const id_user = req.user.id;
        if(!req.file){
            return res.status(400).json({ message: 'El video es requerido' });
        }
        const metadata = await parseFile(req.file.path);
        // En tu controlador:
        const duration_video = await getDurationInSeconds(req.file.path);
        console.log('Duración del video:', duration_video);
        if (!duration_video || duration_video <= 0) {
            return res.status(400).json({ message: 'No se pudo obtener la duración del video con ffprobe' });
        }
        console.log('Archivo recibido:', req.file);
        const videoData = {
            name_video: req.file.originalname,
            format_video: req.file.mimetype.split('/')[1],
            duration_video: duration_video,
            size_video: req.file.size, // Tamaño en bytes convertido a bigint
            url_video: req.file.path
        }
        console.log('Datos del video:', videoData);
        const result = validateVideoData(videoData);
        try{
            if(!result.success){
                console.error('Errores de validación:', result.error.errors);
                return res.status(400).json({
                    message: 'Datos del video inválidos',
                    errors: result.error.errors
                });
            }
            const createdVideo = await this.ModelsVideos.createVideo({video: result.data, id_user});
            if(createdVideo){
                return res.status(201).json({
                    message: 'Video creado correctamente',
                    data: createdVideo
                });
            }
        }
        catch(error){
            console.error('Error al crear el video:', error);
            return res.status(500).json({
                message: 'Error al crear el video',
                error: error.message
            });
        }
    }

    // Crear un audio a un video
    createAudio = async (req, res) => {
        const {id_video} = req.params;
        // Obtenemos los asrchivos de las pistas
        const audio_main = req.files.url_audio_main[0];
        const audio_secondary = req.files.url_audio_secondary[0];

        // Sacamos el tiempo que tarda cada audio
        const metadata_main = await parseFile(audio_main.path)
        const metadata_secondary = await parseFile(audio_secondary.path)

        const duration_main = metadata_main.format.duration || 0
        const duration_secondary = metadata_secondary.format.duration || 0

        // Datos a pasar al db
        const audioData = {
            name_audio_main: audio_main.originalname,
            name_audio_secondary: audio_secondary.originalname,
            format_audio_main: audio_main.mimetype.split('/')[1],
            format_audio_secondary: audio_secondary.mimetype.split('/')[1],
            duration_audio_main: duration_main,
            duration_audio_secondary: duration_secondary,
            size_audio_main: audio_main.size,
            size_audio_secondary: audio_secondary.size,
            url_audio_main: audio_main.path,
            url_audio_secondary: audio_secondary.path
        }
        console.log('Datos del audio:', audioData);
        
        // Se valida los datos
        const result = validateAudioData(audioData);
        try{
            if(!result.success){
                return res.status(400).json({
                    message: 'Datos del video inválidos',
                    errors: result.error.errors
                });
            }
            const createdAudio = await this.ModelsVideos.createAudio({audio: result.data, id_video})
            if(createdAudio){
                return res.status(201).json({
                    message: 'Pistas creadas correctamente',
                    data: createdAudio
                });
            }
        }
        catch(error){
            console.error('Error al crear el video:', error);
            return res.status(500).json({
                message: 'Error al crear el video',
                error: error.message
            });
        }
    }

    // Crear un subtitulo a un video
    createSubtitle = async(req, res) => {
        const {id_video} = req.params;
        // Obtenemos los archivos de los subtitulos
        const subtitles_main = req.files.subtitle_main_video[0]
        const subtitles_secondary = req.files.subtitle_secondary_video[0];

        // Datos a pasar a db
        const subtitleData = {
            subtitle_main_video: subtitles_main.path,
            subtitle_secondary_video: subtitles_secondary.path,
            format_subtitle_main: subtitles_main.mimetype.split('/')[1],
            format_subtitle_secondary: subtitles_secondary.mimetype.split('/')[1],
            size_subtitle_main: subtitles_main.size,
            size_subtitle_secondary: subtitles_secondary.size
        }
        console.log('Datos del subtitulo:', subtitleData);
        
        // Se valida los datos
        const result = validateSubtitleData(subtitleData);
        try{
            if(!result.success){
                return res.status(400).json({
                    message: 'Datos del video inválidos',
                    errors: result.error.errors
                });
            }
            const createdSubtitles = await this.ModelsVideos.createSubtitle({subtitle: result.data, id_video});
            if(createdSubtitles){
                return res.status(201).json({
                    message: 'Subtitulos creados correctamente',
                    data: createdSubtitles
                });
            }
        }
        catch(error){
            console.error('Error al crear el video:', error);
            return res.status(500).json({
                message: 'Error al crear el video',
                error: error.message
            });
        }
    }

    updateVideoAssets = async (req, res) => {
        const { id_video } = req.params;

        if (!id_video) return res.status(400).json({ message: 'El ID del video es requerido' });

        try {
            await connection.beginTransaction();

            // ---------- VIDEO ----------
            if (req.file) {  // middleware multer para video usa .single('url_video')
            const metadata = await parseFile(req.file.path);
            const videoData = {
                name_video: req.file.originalname,
                format_video: req.file.mimetype.split('/')[1],
                duration_video: metadata.format.duration || 0,
                size_video: req.file.size,
                url_video: req.file.path,
            };

            const validationVideo = validateVideoUpdateData(videoData);
            if (!validationVideo.success) {
                await connection.rollback();
                return res.status(400).json({ message: 'Datos del video inválidos', errors: validationVideo.error.errors });
            }

            await this.ModelsVideos.updateVideo(id_video, validationVideo.data);
            }

            // ---------- AUDIOS ----------
            const audioData = {};
            if (req.files?.url_audio_main) {
            const audioMain = req.files.url_audio_main[0];
            const metaMain = await parseFile(audioMain.path);
            Object.assign(audioData, {
                name_audio_main: audioMain.originalname,
                format_audio_main: audioMain.mimetype.split('/')[1],
                duration_audio_main: metaMain.format.duration || 0,
                size_audio_main: audioMain.size,
                url_audio_main: audioMain.path,
            });
            }
            if (req.files?.url_audio_secondary) {
            const audioSecondary = req.files.url_audio_secondary[0];
            const metaSecondary = await parseFile(audioSecondary.path);
            Object.assign(audioData, {
                name_audio_secondary: audioSecondary.originalname,
                format_audio_secondary: audioSecondary.mimetype.split('/')[1],
                duration_audio_secondary: metaSecondary.format.duration || 0,
                size_audio_secondary: audioSecondary.size,
                url_audio_secondary: audioSecondary.path,
            });
            }
            if (Object.keys(audioData).length > 0) {
            const partialAudioSchema = SchemaAudio.partial(); // esquema parcial para actualizar solo campos recibidos
            const validationAudio = partialAudioSchema.safeParse(audioData);
            if (!validationAudio.success) {
                await connection.rollback();
                return res.status(400).json({ message: 'Datos de audio inválidos', errors: validationAudio.error.errors });
            }
            await this.ModelsVideos.updateAudio(id_video, validationAudio.data);
            }

            // ---------- SUBTÍTULOS ----------
            const subtitleData = {};
            if (req.files?.subtitle_main_video) {
            const subtitleMain = req.files.subtitle_main_video[0];
            Object.assign(subtitleData, {
                subtitle_main_video: subtitleMain.path,
                format_subtitle_main: subtitleMain.mimetype.split('/')[1],
                size_subtitle_main: subtitleMain.size,
            });
            }
            if (req.files?.subtitle_secondary_video) {
            const subtitleSecondary = req.files.subtitle_secondary_video[0];
            Object.assign(subtitleData, {
                subtitle_secondary_video: subtitleSecondary.path,
                format_subtitle_secondary: subtitleSecondary.mimetype.split('/')[1],
                size_subtitle_secondary: subtitleSecondary.size,
            });
            }
            if (Object.keys(subtitleData).length > 0) {
            const partialSubtitleSchema = SchemaSubtitles.partial();
            const validationSubtitle = partialSubtitleSchema.safeParse(subtitleData);
            if (!validationSubtitle.success) {
                await connection.rollback();
                return res.status(400).json({ message: 'Datos de subtítulos inválidos', errors: validationSubtitle.error.errors });
            }
            await this.ModelsVideos.updateSubtitle(id_video, validationSubtitle.data);
            }

            await connection.commit();
            return res.status(200).json({ message: 'Actualización parcial completada correctamente' });
        } catch (error) {
            await connection.rollback();
            console.error('Error actualizando video y sus audios/subtítulos:', error);
            return res.status(500).json({ message: 'Error en la actualización', error: error.message });
        }
    }

    // Select/Deselect video
    updateVideoSelection = async (req, res) => {
        const { id_video, is_selected } = req.body;

        if (typeof id_video === 'undefined' || typeof is_selected === 'undefined') {
            return res.status(400).json({ message: 'El id_video y is_selected son requeridos' });
        }

        try {
            const result = await this.ModelsVideos.updateVideoSelection({ id_video, is_selected });
            if (result.message.includes('No se encontró')) {
            return res.status(404).json(result);
            }
            return res.json(result);
        } catch (error) {
            console.error('Error actualizando selección:', error);
            return res.status(500).json({ message: 'Error actualizando selección', error: error.message });
        }
    };

    deleteVideo = async (req, res) => {
        const { id_video } = req.params;

        if (!id_video) return res.status(400).json({ message: 'El ID del video es requerido' });

        try {
            const result = await this.ModelsVideos.deleteVideo({ id_video: Number(id_video) });
            if (!result) {
            return res.status(404).json({ message: 'No se encontró el video para eliminar' });
            }
            return res.json({ message: 'Video eliminado correctamente' });
        } catch (error) {
            console.error('Error eliminando video:', error);
            return res.status(500).json({ message: 'Error eliminando video', error: error.message });
        }
    };
}