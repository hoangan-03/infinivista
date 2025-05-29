'use client';

import React, {useState} from 'react';
import {toast} from 'react-toastify';

import {Icon, Spinner} from '@/components/commons';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui';
import {cn} from '@/lib/utils';
import {SUPPORTED_LANGUAGES, TranslationLanguage} from '@/modules/translation/translation.interface';
import {useTranslateText} from '@/modules/translation/translation.swr';

interface TranslationButtonProps {
    originalText: string;
    onTranslationComplete: (translatedText: string, targetLanguage?: string) => void;
    onTranslationClear: () => void;
    isTranslated: boolean;
    currentTargetLanguage?: TranslationLanguage;
    className?: string;
}

export const TranslationButton: React.FC<TranslationButtonProps> = ({
    originalText,
    onTranslationComplete,
    onTranslationClear,
    isTranslated,
    currentTargetLanguage,
    className,
}) => {
    const {translateText, isTranslating} = useTranslateText();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    console.log('TranslationButton render:', {isTranslating, isTranslated, isDropdownOpen});
    const handleTranslate = async (targetLanguage: TranslationLanguage) => {
        if (!originalText.trim()) {
            toast.error('No text to translate');
            return;
        }

        console.log('Starting translation...', {targetLanguage, isTranslating});
        try {
            const response = await translateText({
                content: originalText,
                targetLanguage: targetLanguage,
            });

            console.log('Translation response:', response);
            if (response?.data) {
                onTranslationComplete(response.data, targetLanguage);
                toast.success(
                    `Translated to ${SUPPORTED_LANGUAGES.find((lang) => lang.code === targetLanguage)?.name || targetLanguage}`
                );
            } else {
                toast.error('Translation failed. Please try again.');
            }
        } catch (error) {
            console.error('Translation error:', error);
            toast.error('Translation failed. Please try again.');
        }
        setIsDropdownOpen(false);
    };

    const handleClearTranslation = () => {
        onTranslationClear();
        setIsDropdownOpen(false);
    };
    if (isTranslating) {
        return (
            <div className={cn('flex items-center', className)}>
                <Spinner width={24} height={24} />
            </div>
        );
    }
    if (isTranslated) {
        const targetLanguageName =
            SUPPORTED_LANGUAGES.find((lang) => lang.code === currentTargetLanguage)?.name || currentTargetLanguage;

        return (
            <div className={cn('flex items-center gap-2', className)}>
                <span className='text-sm text-blue-600'>Translated to {targetLanguageName}</span>
                <Button
                    variant='icon'
                    size='icon'
                    onClick={handleClearTranslation}
                    className='text-blue-600 hover:text-blue-800'
                >
                    <Icon name='x-mark' width={16} height={16} />
                </Button>
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='icon' size='icon' className='text-blue-600 hover:text-blue-800'>
                            <Icon name='language' width={24} height={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center' className='z-50 max-h-64 w-48 overflow-y-auto'>
                        {SUPPORTED_LANGUAGES.map((language) => (
                            <DropdownMenuItem
                                key={language.code}
                                onClick={() => handleTranslate(language.code)}
                                className='flex items-center px-3 py-2 hover:bg-gray-50'
                            >
                                <div className='flex flex-col'>
                                    <span className='text-sm font-medium'>{language.name}</span>
                                    <span className='text-xs text-gray-500'>{language.nativeName}</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='icon' size='icon' className='text-gray-600 hover:text-blue-600'>
                    <Icon name='language' width={24} height={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' className='z-50 max-h-64 w-48 overflow-y-auto'>
                {SUPPORTED_LANGUAGES.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleTranslate(language.code)}
                        className='flex items-center px-3 py-2 hover:bg-gray-50'
                    >
                        <div className='flex flex-col'>
                            <span className='text-sm font-medium'>{language.name}</span>
                            <span className='text-xs text-gray-500'>{language.nativeName}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
