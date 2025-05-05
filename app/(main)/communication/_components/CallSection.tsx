import {ClientVideo, Icon} from '@/components/commons';
import {Button} from '@/components/ui';

export const CallSection: React.FC = () => {
    return (
        <div className='relative flex h-[89vh] flex-col gap-5 rounded-xl bg-custom-conic p-6 shadow-callSection'>
            <h4 className='font-bold text-white'>Capstone Project Team</h4>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='relative size-4 rounded-full bg-red-500'>
                        <div className='absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white' />
                    </div>
                    <p className='text-gray-300'>REC</p>
                    <p className='text-gray-300'>00:02:18</p>
                </div>
                <p className='text-gray-300'>4 people joined</p>
            </div>
            <div className='relative flex-grow overflow-hidden rounded-xl'>
                <div className='absolute bottom-4 z-10 flex w-full items-center justify-center gap-6'>
                    <Button variant='icon' size='icon' className='size-12 rounded-full bg-white hover:bg-slate-200'>
                        <Icon name='video-camera' width={16} height={16} />
                    </Button>
                    <Button
                        variant='icon'
                        size='icon'
                        className='h-[72px] w-[72px] rounded-lg bg-red-500 hover:bg-red-600'
                    >
                        <Icon name='phone' className='text-white' width={36} height={36} />
                    </Button>
                    <Button variant='icon' size='icon' className='size-12 rounded-full bg-white hover:bg-slate-200'>
                        <Icon name='microphone' />
                    </Button>
                </div>
                <ClientVideo
                    controls={false}
                    src='https://res.cloudinary.com/dght74v9o/video/upload/v1735408641/samples/cld-sample-video.mp4'
                    className='absolute inset-0 h-full w-full object-cover'
                />
            </div>
        </div>
    );
};
