import {Label, RadioGroup, RadioGroupItem, Switch} from '@/components/ui';

enum PRIVACY_OPTIONS {
    PUBLIC = 'public',
    PRIVATE = 'private',
    FRIENDS_ONLY = 'friends-only',
}

function SettingsPrivacyPage() {
    return (
        <div className='flex items-center justify-center py-8'>
            <div className='w-3/4 space-y-8'>
                <h5 className='font-extrabold text-blue-700'>Privacy Settings</h5>
                <div className='space-y-4'>
                    <h6 className='text-[18px]'>Account Privacy</h6>
                    <div className='space-y-2'>
                        <p className='text-justify text-sm text-gray-500'>
                            When your account is <span className='font-bold'>public</span>, anyone—on or off
                            Infinivista—can see your profile and posts, even if they do not have an account. This
                            includes your photos, videos, and activity across hashtag and location pages.
                        </p>
                        <p className='text-justify text-sm text-gray-500'>
                            With a <span className='font-bold'>private</span> account, only followers you approve can
                            see what you share, including your posts, followers, and following lists. However, your
                            username and profile picture may still be visible to everyone.
                        </p>
                    </div>
                    <div className='flex items-center justify-between rounded-2xl border border-gray-300 p-6'>
                        <p>Private account</p>
                        <Switch />
                    </div>
                </div>
                <div className='space-y-4'>
                    <h6 className='text-[18px]'>Post Privacy</h6>
                    <p className='text-justify text-sm text-gray-500'>
                        Choose the permission on which individuals can see your posts.
                    </p>
                    <RadioGroup
                        defaultValue={PRIVACY_OPTIONS.PUBLIC}
                        className='space-y-4 rounded-2xl border border-gray-300 p-6'
                    >
                        <div className='flex items-center justify-between'>
                            <Label htmlFor={PRIVACY_OPTIONS.PUBLIC}>Public</Label>
                            <RadioGroupItem value={PRIVACY_OPTIONS.PUBLIC} id={PRIVACY_OPTIONS.PUBLIC} />
                        </div>
                        <div className='flex items-center justify-between'>
                            <Label htmlFor={PRIVACY_OPTIONS.PRIVATE}>Private</Label>
                            <RadioGroupItem value={PRIVACY_OPTIONS.PRIVATE} id={PRIVACY_OPTIONS.PRIVATE} />
                        </div>
                        <div className='flex items-center justify-between'>
                            <Label htmlFor={PRIVACY_OPTIONS.FRIENDS_ONLY}>Friends Only</Label>
                            <RadioGroupItem value={PRIVACY_OPTIONS.FRIENDS_ONLY} id={PRIVACY_OPTIONS.FRIENDS_ONLY} />
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}

export default SettingsPrivacyPage;
