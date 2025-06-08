export interface ITypographyForm  {
    primaryFont: File | null;
    secondaryFont: File | null;
    titleSize: number;
    subtitleSize: number;
    paragraphSize: number;
}

export interface ITypographyPreview  {
    primaryFont: string | null;
    secondaryFont: string | null;
    titleSize: number;
    subtitleSize: number;
    paragraphSize: number;
}