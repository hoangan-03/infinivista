'use client';

import {useAuthContext} from '@/context';

function useGetProfileInfo() {
    const {state} = useAuthContext();
    const user = state.user;

    return {
        userId: user?.id,
        email: user?.email,
        username: user?.username,
        phoneNumber: user?.phoneNumber,
        dob: user?.dob,
        firstName: user?.firstName,
        lastName: user?.lastName,
        profileImageUrl: user?.profileImageUrl,
        coverImageUrl: user?.coverImageUrl,
        address: user?.address,
        profilePrivacy: user?.profilePrivacy,
    };
}

export {useGetProfileInfo};
