import {redirect} from 'next/navigation';

import {profile} from '@/mock_data/profile';

export default function Profile() {
    const username = profile.username;

    redirect(`/profile/${username}`);
}
