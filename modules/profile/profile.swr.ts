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

function useGetProfileBiography() {
    const url = ProfileService.ROUTES.profileBiography;

    const {data, mutate, error, isLoading, isValidating} = useSWR({key: url}, ProfileService.getProfileBiography, {
        keepPreviousData: false,
        revalidateOnFocus: false,
    });

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

function useGetProfileSocialLinks() {
    const url = ProfileService.ROUTES.profileSocialLinks;

    const {data, mutate, error, isLoading, isValidating} = useSWR({key: url}, ProfileService.getProfileSocialLinks, {
        keepPreviousData: false,
        revalidateOnFocus: false,
    });

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

function useGetProfileUserEvents() {
    const url = ProfileService.ROUTES.profileUserEvents;

    const {data, mutate, error, isLoading, isValidating} = useSWR(url, ProfileService.getProfileUserEvents, {
        keepPreviousData: false,
        revalidateOnFocus: false,
    });

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

export {useGetProfileBiography, useGetProfileById, useGetProfileSocialLinks, useGetProfileUserEvents};
