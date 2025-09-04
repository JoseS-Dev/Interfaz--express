
export interface ITypography {
    id_tipography: string;
    name_tipography_main: string;
    name_tipography_secondary: string;
    tam_paragraph: number;
    tam_title: number;
    tam_subtitle: number;
    archive_font_main: string;
    archive_font_secondary: string;
    is_selected: number;
}

export interface ITypographyPostData {
    name_tipography_main: string;
    name_tipography_secondary: string;
    tam_paragraph: string;
    tam_title: string;
    tam_subtitle: string;
    archive_font_main: File | null;
    archive_font_secondary: File | null;
}