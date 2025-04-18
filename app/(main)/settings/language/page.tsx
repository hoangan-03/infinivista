import {Input, Label, RadioGroup, RadioGroupItem, ScrollArea} from '@/components/ui';

enum LANGUAGES {
    ENGLISH = 'english',
    VIETNAM = 'vietnam',
    FRENCH = 'french',
    SPANISH = 'spanish',
    GERMAN = 'german',
    ITALIAN = 'italian',
    PORTUGUESE = 'portuguese',
    RUSSIAN = 'russian',
    JAPANESE = 'japanese',
}

type LanguageOptions = {
    label: string;
    value: LANGUAGES;
};

const languageOptions: LanguageOptions[] = [
    {label: 'English', value: LANGUAGES.ENGLISH},
    {label: 'Việt Nam', value: LANGUAGES.VIETNAM},
    {label: 'Français', value: LANGUAGES.FRENCH},
    {label: 'Español', value: LANGUAGES.SPANISH},
    {label: 'Deutsch', value: LANGUAGES.GERMAN},
    {label: 'Italiano', value: LANGUAGES.ITALIAN},
    {label: 'Português', value: LANGUAGES.PORTUGUESE},
    {label: 'Русский', value: LANGUAGES.RUSSIAN},
    {label: '日本語', value: LANGUAGES.JAPANESE},
];

function SettingsLanguagePage() {
    return (
        <div className='flex items-center justify-center py-8'>
            <div className='w-3/4 space-y-8'>
                <h5 className='font-extrabold text-blue-700'>Language Preferences</h5>
                <div className='space-y-4'>
                    <h6 className='text-[18px]'>App Language</h6>
                    <p className='text-justify text-sm text-gray-500'>
                        See buttons, titles, and other texts on Infinivista in your preferred language.
                    </p>
                    <div className='space-y-2'>
                        <Input placeholder='Search' />
                        <ScrollArea className='h-[50vh] rounded-2xl border border-gray-300'>
                            <RadioGroup defaultValue={LANGUAGES.ENGLISH} className='space-y-4 p-6'>
                                {languageOptions.map((option) => (
                                    <div className='flex items-center justify-between' key={option.value}>
                                        <Label htmlFor={option.value}>{option.label}</Label>
                                        <RadioGroupItem value={option.value} id={option.value} />
                                    </div>
                                ))}
                            </RadioGroup>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsLanguagePage;
