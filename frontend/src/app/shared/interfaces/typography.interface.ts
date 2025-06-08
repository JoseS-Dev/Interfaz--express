
export interface ITypography {
    name_tipography_main: string;
    name_tipography_secondary: string;
    tam_paragraph: string;
    tam_title: string;
    tam_subtitle: string;
    archive_font_main: string;
    archive_font_secondary: string;
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