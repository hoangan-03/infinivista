export interface ITranslationRequest {
    content: string;
    targetLanguage: TranslationLanguage;
}

export enum TranslationLanguage {
    ENGLISH = 'ENGLISH',
    FRENCH = 'FRENCH',
    SPANISH = 'SPANISH',
    GERMAN = 'GERMAN',
    ITALIAN = 'ITALIAN',
    PORTUGUESE = 'PORTUGUESE',
    RUSSIAN = 'RUSSIAN',
    ARABIC = 'ARABIC',
    CHINESE = 'CHINESE',
    JAPANESE = 'JAPANESE',
    KOREAN = 'KOREAN',
    VIETNAMESE = 'VIETNAMESE',
    HINDI = 'HINDI',
    THAI = 'THAI',
}

export interface ISupportedLanguage {
    code: TranslationLanguage;
    name: string;
    nativeName: string;
}

export const SUPPORTED_LANGUAGES: ISupportedLanguage[] = [
    {code: TranslationLanguage.ENGLISH, name: 'English', nativeName: 'English'},
    {code: TranslationLanguage.VIETNAMESE, name: 'Vietnamese', nativeName: 'Tiếng Việt'},
    {code: TranslationLanguage.FRENCH, name: 'French', nativeName: 'Français'},
    {code: TranslationLanguage.SPANISH, name: 'Spanish', nativeName: 'Español'},
    {code: TranslationLanguage.GERMAN, name: 'German', nativeName: 'Deutsch'},
    {code: TranslationLanguage.ITALIAN, name: 'Italian', nativeName: 'Italiano'},
    {code: TranslationLanguage.PORTUGUESE, name: 'Portuguese', nativeName: 'Português'},
    {code: TranslationLanguage.RUSSIAN, name: 'Russian', nativeName: 'Русский'},
    {code: TranslationLanguage.JAPANESE, name: 'Japanese', nativeName: '日本語'},
    {code: TranslationLanguage.KOREAN, name: 'Korean', nativeName: '한국어'},
    {code: TranslationLanguage.CHINESE, name: 'Chinese', nativeName: '中文'},
    {code: TranslationLanguage.ARABIC, name: 'Arabic', nativeName: 'العربية'},
    {code: TranslationLanguage.HINDI, name: 'Hindi', nativeName: 'हिन्दी'},
    {code: TranslationLanguage.THAI, name: 'Thai', nativeName: 'ไทย'},
];
