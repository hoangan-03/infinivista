import {redirect} from 'next/navigation';

import currentUser from '@/mock_data/self';

export default function Profile() {
    const username = currentUser.username;

    // immediately redirects to /profile/[username]
    redirect(`/profile/${username}`);
}
