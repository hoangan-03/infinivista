'use client';

import React, {useState} from 'react';
import {toast} from 'react-toastify';

import {Icon, Spinner} from '@/components/commons';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui';
import {cn} from '@/lib/utils';
import {SUPPORTED_LANGUAGES} from '@/modules/translation/translation.interface';
import {useTranslateText} from '@/modules/translation/translation.swr';

interface TranslationButtonProps {
    originalText: string;
    onTranslationComplete: (translatedText: string, sourceLanguage: string, targetLanguage: string) => void;
    onTranslationClear: () => void;
    isTranslated: boolean;
    className?: string;
}

export const TranslationButton: React.FC<TranslationButtonProps> = ({
    originalText,
    onTranslationComplete,
    onTranslationClear,
    isTranslated,
    className,
}) => {
    const {translateText, isTranslating} = useTranslateText();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const handleTranslate = async (targetLanguage: string) => {
        if (!originalText.trim()) {
            toast.error('No text to translate');
            return;
        }

        console.log('Starting translation...', {targetLanguage, isTranslating});

        try {
            const response = await translateText({
                text: originalText,
                targetLanguage,
            });

            console.log('Translation response:', response);

            if (response?.data?.translatedText) {
                onTranslationComplete(
                    response.data.translatedText,
                    response.data.sourceLanguage,
                    response.data.targetLanguage
                );
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
            <Button variant='icon' size='icon' disabled className={cn('cursor-not-allowed', className)}>
                <Spinner width={16} height={16} />
            </Button>
        );
    }
    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='icon' size='icon' className={cn('group', className)}>
                    <Icon
                        name={isTranslated ? 'language-filled' : 'language'}
                        className={cn(
                            'transition-colors',
                            isTranslated ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
                        )}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' className='z-50 max-h-64 w-48 overflow-y-auto'>
                {isTranslated && (
                    <>
                        <DropdownMenuItem
                            onClick={handleClearTranslation}
                            className='text-red-600 hover:bg-red-50 hover:text-red-700'
                        >
                            <Icon name='close' className='mr-2 h-4 w-4' />
                            Show Original
                        </DropdownMenuItem>
                        <div className='my-1 border-t border-gray-200' />
                    </>
                )}
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
