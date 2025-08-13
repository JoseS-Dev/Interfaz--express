import zod from 'zod';

// Esquema de los datos del video
export const SchemaVideos = zod.object({
    name_video: zod.string({
        required_error: 'El nombre del video es requerido',
        invalid_type_error: 'El nombre del video debe ser una cadena de texto'
    }),
    
    format_video: zod.string({
        required_error: 'El formato del video es requerido',
        invalid_type_error: 'El formato del video debe ser una cadena de texto'
    }).refine(value => {
        const validTypes = ['mp4', 'avi', 'mov', 'mkv'];
        return validTypes.includes(value.split('.').pop().toLowerCase());
    }, {
        message: 'El formato del video debe ser mp4, avi, mov o mkv'
    }),
    
    duration_video: zod.number({
        required_error: 'La duración del video es requerida',
        invalid_type_error: 'La duración del video debe ser un número'
    }),

    url_video: zod.string({
        required_error: 'La URL del video es requerida',
        invalid_type_error: 'La URL del video debe ser una cadena de texto'
    }).url({
        message: 'La URL del video debe ser una URL válida'
    }),

    size_video: zod.number({
        required_error: 'El tamaño del video es requerido',
        invalid_type_error: 'El tamaño del video debe ser un número entero'
    }).positive({
        message: 'El tamaño del video debe ser un número positivo'
    })
})

// Esquema de los datos del audio
export const SchemaAudio = zod.object({
    name_audio_main: zod.string({
        required_error: 'El nombre del audio principal es requerido',
        invalid_type_error: 'El nombre del audio principal debe ser una cadena de texto'
    }),
    
    name_audio_secondary: zod.string({
        required_error: 'El nombre del audio secundario es requerido',
        invalid_type_error: 'El nombre del audio secundario debe ser una cadena de texto'
    }),
    
    format_audio_main: zod.string({
        required_error: 'El formato del audio principal es requerido',
        invalid_type_error: 'El formato del audio principal debe ser una cadena de texto'
    }).refine(value => {
        const validTypes = ['mp3', 'wav', 'm4a', 'x-m4a']
        return validTypes.includes(value.split('.').pop().toLowerCase())
    }),
    
    format_audio_secondary: zod.string({
        required_error: 'El formato del audio secundario es requerido',
        invalid_type_error: 'El formato del audio secundario debe ser una cadena de texto'
    }).refine(value => {
        const validTypes = ['mp3', 'wav', 'm4a', 'x-m4a']
        return validTypes.includes(value.split('.').pop().toLowerCase())
    }),
    
    duration_audio_main: zod.number({
        required_error: 'La duración del audio principal es requerida',
        invalid_type_error: 'La duración del audio principal debe ser un número'
    }),
    
    duration_audio_secondary: zod.number({
        required_error: 'La duración del audio secundario es requerida',
        invalid_type_error: 'La duración del audio secundario debe ser un número'
    }),
    
    size_audio_main: zod.number({
        required_error: 'El tamaño del audio principal es requerido',
        invalid_type_error: 'El tamaño del audio principal debe ser un número'
    }),
    
    size_audio_secondary: zod.number({
        required_error: 'El tamaño del audio secundario es requerido',
        invalid_type_error: 'El tamaño del audio secundario debe ser un número'
    }),
    
    url_audio_main: zod.string({
        required_error: 'La URL del audio principal es requerida',
        invalid_type_error: 'La URL del audio principal debe ser una cadena de texto'
    }).url(),
    
    url_audio_secondary: zod.string({
        required_error: 'La URL del audio secundario es requerida',
        invalid_type_error: 'La URL del audio secundario debe ser una cadena de texto'
    }).url()
})

// Esquema de los datos del subtitulo
export const SchemaSubtitles = zod.object({
    subtitle_main_video: zod.string(),
    subtitle_secondary_video: zod.string(),
    format_subtitle_main: zod.string().refine(value => {
        const validTypes = ['vtt', 'srt']
        return validTypes.includes(value.split('.').pop().toLowerCase())
    }),
    format_subtitle_secondary: zod.string().refine(value => {
        const validTypes = ['vtt', 'srt']
        return validTypes.includes(value.split('.').pop().toLowerCase())
    }),
    size_subtitle_main: zod.number(),
    size_subtitle_secondary: zod.number()
})

// Funcion para validar los datos del video cuando se crea
export function validateVideoData(data) {
    return SchemaVideos.safeParse(data);
}

// Funcion para validar los datos del video cuando se actualiza
export function validateVideoUpdateData(data) {
    return SchemaVideos.partial().safeParse(data);
}

// Function que valida los datos del audio cuando se crea
export function validateAudioData(data){
    return SchemaAudio.safeParse(data);
}

// Function que valida los datos del subtitulo cuando se crea
export function validateSubtitleData(data){
    return SchemaSubtitles.safeParse(data);
}
