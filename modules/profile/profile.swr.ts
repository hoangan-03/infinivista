import useSWR from 'swr';

import {ProfileService} from './profile.service';

function useGetProfileById(userId?: string) {
    const url = userId ? ProfileService.ROUTES.profileById(userId) : null;

    const {data, mutate, error, isLoading, isValidating} = useSWR(
        userId ? {key: url, userId} : null,
        ProfileService.getProfileById,
        {
            keepPreviousData: false,
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

function useGetProfileBiography(userId?: string) {
    const url = userId ? ProfileService.ROUTES.profileBiography(userId) : null;

    const {data, mutate, error, isLoading, isValidating} = useSWR(
        userId ? {key: url, userId} : null,
        ProfileService.getProfileBiography,
        {
            keepPreviousData: false,
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

function useGetProfileSocialLinks(userId?: string) {
    const url = userId ? ProfileService.ROUTES.profileSocialLinks(userId) : null;

    const {data, mutate, error, isLoading, isValidating} = useSWR(
        userId ? {key: url, userId} : null,
        ProfileService.getProfileSocialLinks,
        {
            keepPreviousData: false,
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

function useGetProfileUserEvents(userId?: string) {
    const url = userId ? ProfileService.ROUTES.profileUserEvents(userId) : null;

    const {data, mutate, error, isLoading, isValidating} = useSWR(
        userId ? {key: url, userId} : null,
        ProfileService.getProfileUserEvents,
        {
            keepPreviousData: false,
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

export {useGetProfileBiography, useGetProfileById, useGetProfileSocialLinks, useGetProfileUserEvents};
