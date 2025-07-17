import zod from 'zod';
import { size } from 'zod/v4';

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
        return validTypes.includes(value.toLowerCase());
    }, {
        message: 'El formato del video debe ser mp4, avi, mov o mkv'
    }),
    
    duration_video: zod.number({
        required_error: 'La duración del video es requerida',
        invalid_type_error: 'La duración del video debe ser un número'
    }).positive({
        message: 'La duración del video debe ser un número positivo'
    }),

    audio_track_main_video: zod.string({
        required_error: 'La pista de audio principal del video es requerida',
        invalid_type_error: 'La pista de audio principal del video debe ser una cadena de texto'
    }).url({
        message: 'La pista de audio principal del video debe ser una URL válida'
    }),

    audio_track_secondary_video: zod.string({
        required_error: 'La pista de audio secundaria del video es requerida',
        invalid_type_error: 'La pista de audio secundaria del video debe ser una cadena de texto'
    }).url({
        message: 'La pista de audio secundaria del video debe ser una URL válida'
    }),

    subtitle_main_video: zod.string({
        required_error: 'El subtítulo principal del video es requerido',
        invalid_type_error: 'El subtítulo principal del video debe ser una cadena de texto'
    }).url({
        message: 'El subtítulo principal del video debe ser una URL válida'
    }),

    subtitle_secondary_video: zod.string({
        required_error: 'El subtítulo secundario del video es requerido',
        invalid_type_error: 'El subtítulo secundario del video debe ser una cadena de texto'
    }).url({
        message: 'El subtítulo secundario del video debe ser una URL válida'
    }),

    url_video: zod.string({
        required_error: 'La URL del video es requerida',
        invalid_type_error: 'La URL del video debe ser una cadena de texto'
    }).url({
        message: 'La URL del video debe ser una URL válida'
    }),

    size_video: zod.bigint({
        required_error: 'El tamaño del video es requerido',
        invalid_type_error: 'El tamaño del video debe ser un número entero'
    }).positive({
        message: 'El tamaño del video debe ser un número positivo'
    })
})

// Funcion para validar los datos del video cuando se crea
export function validateVideoData(data) {
    return SchemaVideos.parse(data);
}

// Funcion para validar los datos del video cuando se actualiza
export function validateVideoUpdateData(data) {
    return SchemaVideos.partial().parse(data);
}
