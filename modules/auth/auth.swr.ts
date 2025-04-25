import useSWR from 'swr';

import {ProfileService} from '../profile/profile.service';

function useGetProfile(shouldFetch: boolean = true) {
    const url = ProfileService.ROUTES.me;

    const {data, error, isValidating, isLoading, mutate} = useSWR(
        shouldFetch ? {key: url} : null,
        ProfileService.getProfile,
        {
            revalidateOnFocus: false,
            keepPreviousData: false,
        }
    );

    return {
        data,
        error,
        isValidating,
        isLoading,
        mutate,
    };
}

export {useGetProfile};
