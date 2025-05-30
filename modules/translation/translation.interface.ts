export interface ITranslationRequest {
    text: string;
    sourceLanguage?: string; // Auto-detect if not provided
    targetLanguage: string;
}

export interface ITranslationResponse {
    success: boolean;
    data: ITranslationResponseData;
}

export interface ITranslationResponseData {
    originalText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    confidence?: number; // Translation confidence score
    timestamp: string;
}

export interface ISupportedLanguage {
    code: string;
    name: string;
    nativeName: string;
}

export const SUPPORTED_LANGUAGES: ISupportedLanguage[] = [
    {code: 'en', name: 'English', nativeName: 'English'},
    {code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt'},
    {code: 'fr', name: 'French', nativeName: 'Français'},
    {code: 'es', name: 'Spanish', nativeName: 'Español'},
    {code: 'de', name: 'German', nativeName: 'Deutsch'},
    {code: 'it', name: 'Italian', nativeName: 'Italiano'},
    {code: 'pt', name: 'Portuguese', nativeName: 'Português'},
    {code: 'ru', name: 'Russian', nativeName: 'Русский'},
    {code: 'ja', name: 'Japanese', nativeName: '日本語'},
    {code: 'ko', name: 'Korean', nativeName: '한국어'},
    {code: 'zh', name: 'Chinese', nativeName: '中文'},
    {code: 'ar', name: 'Arabic', nativeName: 'العربية'},
    {code: 'hi', name: 'Hindi', nativeName: 'हिन्दी'},
    {code: 'th', name: 'Thai', nativeName: 'ไทย'},
];
