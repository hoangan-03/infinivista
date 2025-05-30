import {useState} from 'react';
import useSWRMutation from 'swr/mutation';

import {ITranslationRequest} from './translation.interface';
import {TranslationService} from './translation.service';

// Hook for translating text
function useTranslateText() {
    const [isTranslating, setIsTranslating] = useState<boolean>(false);

    const {trigger, data, error, isMutating} = useSWRMutation(
        TranslationService.ROUTES.translate,
        async (url: string, {arg}: {arg: ITranslationRequest}) => {
            setIsTranslating(true);
            try {
                const response = await TranslationService.translateText({payload: arg});
                return response.data;
            } finally {
                setIsTranslating(false);
            }
        }
    );

    return {
        translateText: trigger,
        data,
        error,
        isTranslating: isMutating || isTranslating,
    };
}

export {useTranslateText};
