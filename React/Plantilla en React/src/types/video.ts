export interface VideoMetadata {
    fileName?: string;
    fileFormat?: string;
    duration?: string;
    size?: string;
}

export type VideoType = {
    id: string; 
    title?: string; 
    url_video: string;
    url_primary_subtitle: string | null;
    url_secondary_subtitle: string | null;
    url_primary_audio: string | null;
    url_secondary_audio: string | null;
    file_name?: string;
    file_format?: string;
    duration?: string;
    size?: string;
};

export interface PreviewData {
    videoUrl: string | null;
    primarySubtitleUrl: string | null;
    secondarySubtitleUrl: string | null;
    primaryAudioUrl: string | null;
    secondaryAudioUrl: string | null;
    videoMetadata: VideoMetadata | null;
}