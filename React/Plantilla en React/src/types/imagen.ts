export interface ImageData{
    id_image: number;
    name_image: string;
    format_image: string;
    size_image: number;
    dimension_image: string;
    url_image: string;
    is_selected: number;
}

export interface PreviewImage{
    file: File;
    dimensions: string;
    size: number;
    format: string;
}