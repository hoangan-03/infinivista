import Image from 'next/image';
import React from 'react';

import {cn} from '@/lib/utils';

import {Button} from '../profile/ui/button';

const Home: React.FC = () => {
    return (
        <div className='flex h-auto w-screen flex-col bg-gray-900 text-white'>
            {/* Navbar */}
            {/* <nav className='flex w-full items-center justify-between bg-black bg-opacity-50 px-8 py-4'>
                <div className='text-2xl font-bold'>Infinivista</div>
                <ul className='flex gap-6 text-lg'>
                    <li>
                        <a href='#' className='hover:text-blue-400'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:text-blue-400'>
                            About
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:text-blue-400'>
                            Contact us
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:text-blue-400'>
                            Help Center
                        </a>
                    </li>
                </ul>
                <button className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>Join Beta</button>
            </nav> */}

            {/* Hero Section */}
            <div className='relative flex h-[1024px] w-full items-center justify-center bg-cover bg-center'>
                <video autoPlay loop muted className='absolute inset-0 h-full w-full object-cover'>
                    <source src='/assets/images/back_video.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
                <div className='z-10 text-center'>
                    <h1 className='mb-4 text-2xl font-bold uppercase text-gray-300'>WE ARE INFINIVISTA</h1>
                    <h2 className='mb-10 text-6xl font-bold text-white'>
                        Where the <br /> world connects
                    </h2>
                    <Button
                        variant='default'
                        className={cn('w-auto bg-blue-300 px-[80px] py-[30px] text-2xl text-black hover:bg-blue-400')}
                    >
                        Join the beta
                    </Button>
                </div>
            </div>

            {/* Hero Section */}
            <div className='relative flex h-[1024px] w-full flex-col items-start justify-start bg-[#043E49] bg-cover bg-center pt-24'>
                <div className='flex h-auto w-full flex-row items-end justify-end'>
                    {/* Main Content Section */}
                    <div className='z-[6] ml-24 flex h-[400px] w-1/2 translate-x-12 flex-col items-start space-y-8 rounded-3xl bg-black/20 p-12 text-start shadow-lg'>
                        <h1 className='text-5xl font-bold text-white'>
                            Explore boundaries <br /> of connection
                        </h1>
                        <Button
                            variant='secondary'
                            className={cn('border-4 border-red-300 px-10 py-6 text-xl text-black')}
                        >
                            View more
                        </Button>
                        <p className='text-xl text-white'>
                            Seamlessly bridging the gap between you <br /> and the digital world.
                        </p>
                    </div>
                    <div className='z-[5] h-full w-1/2 pr-36'>
                        {/* iPhone Image Section */}
                        <div className='relative mx-auto h-[620px] w-[620px]'>
                            <Image
                                src='/assets/images/back_image.png'
                                alt='Background Image'
                                width={620}
                                height={620}
                                unoptimized={true}
                                className='absolute left-0 top-0 h-full w-full rounded-[70px] object-cover'
                            />
                            <Image
                                src='/assets/images/iphone.png'
                                alt='iPhone Image'
                                width={322}
                                height={690}
                                unoptimized={true}
                                className='absolute left-1/2 top-10 -translate-x-1/2 transform'
                            />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className='absolute bottom-5 left-0 right-0 mx-24 flex w-auto flex-row justify-center gap-8 rounded-3xl border-2 border-white bg-black/20 px-10 py-5 backdrop-blur-xl'>
                    <div className='flex w-[300px] flex-col items-start justify-start gap-1 text-white'>
                        <Image src='/assets/icons/insights.png' alt='iPhone Image' width={22} height={17} />
                        <h2 className='text-2xl font-semibold'>Community</h2>
                        <p className='text-lg'>Engage with your world like never before.</p>
                    </div>

                    <div className='flex w-[300px] flex-col items-start justify-start gap-1 text-white'>
                        <Image src='/assets/icons/insights.png' alt='iPhone Image' width={22} height={17} />
                        <h2 className='text-2xl font-semibold'>Innovation</h2>
                        <p className='text-lg'>
                            Powered by AI, <br /> secured by blockchain.
                        </p>
                    </div>

                    <div className='flex w-[300px] flex-col items-start justify-start gap-1 text-white'>
                        <Image src='/assets/icons/insights.png' alt='iPhone Image' width={22} height={17} />
                        <h2 className='text-2xl font-semibold'>Connectivity</h2>
                        <p className='text-lg'>
                            Voice, video, and real-time <br /> messaging at your fingertips.
                        </p>
                    </div>

                    <div className='flex w-[300px] flex-col items-start justify-start gap-1 text-white'>
                        <Image src='/assets/icons/insights.png' alt='iPhone Image' width={22} height={17} />
                        <h2 className='text-2xl font-semibold'>Explore</h2>
                        <p className='text-lg'>
                            Unlock tailored and <br /> boundless experiences
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex h-[1440px] w-full flex-col gap-2 bg-black'>
                <div className='flex h-[40%] w-full flex-row items-start justify-end'>
                    <div className='flex w-[40%] flex-col items-start gap-2 py-[100px] pl-[100px] text-start'>
                        <h1 className='text-[70px] font-extrabold text-white'>Your Social Universe, Reimagined</h1>
                        <h4 className='text-2xl text-white'>
                            {' '}
                            Seamlessly connect, share, and create using advanced tools and a personalized experience.{' '}
                        </h4>
                    </div>

                    <div className='flex w-[60%] flex-col items-start justify-start gap-2'>
                        <div className='flex flex-row gap-2'>
                            <Image
                                src='/assets/images/social_1.jpg'
                                alt='iPhone Image'
                                width={350}
                                height={470}
                                unoptimized={true}
                                className='h-[470px] w-[350px] rounded-b-full object-cover'
                            />
                            <Image
                                src='/assets/images/social_2.jpg'
                                alt='iPhone Image'
                                width={350}
                                height={470}
                                unoptimized={true}
                                className='h-[470px] w-[350px] rounded-b-full object-cover'
                            />
                        </div>
                    </div>
                </div>

                <div className='flex h-[40%] w-full flex-row items-start justify-start gap-12 pl-[100px]'>
                    <Image
                        src='/assets/images/social_3.jpg'
                        alt='iPhone Image'
                        width={676}
                        height={300}
                        unoptimized={true}
                        className='mt-12 h-[300px] w-[676px] rounded-3xl object-cover'
                    />

                    <div className='flex w-[40%] flex-col items-start justify-start gap-10 pr-12'>
                        <div className='h-[8px] w-[96px] bg-white' />
                        <div className='flex flex-col gap-1 text-white'>
                            <h2 className='text-4xl font-bold'>01</h2>
                            <h3 className='text-2xl'>
                                Experience real-time messaging, voice and video calls, and interactive live streaming
                                for truly engaging connections.
                            </h3>
                        </div>

                        <div className='flex flex-col gap-1 text-white'>
                            <h2 className='text-4xl font-bold'>02</h2>
                            <h3 className='text-2xl'>
                                AI-driven feeds and customizable interfaces ensure every interaction feels unique and
                                relevant to you.
                            </h3>
                        </div>

                        <div className='flex flex-col gap-1 text-white'>
                            <h2 className='text-4xl font-bold'>03</h2>
                            <h3 className='text-2xl'>
                                From AR-enhanced photos to integrated e-commerce, redefine how you connect with the
                                world.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className='flex h-[20%] w-full flex-row gap-8 px-[150px]'>
                    <Image
                        src='/assets/images/social_4.jpg'
                        alt='iPhone Image'
                        width={412}
                        height={260}
                        unoptimized={true}
                        className='h-[260px] w-[412px] rounded-2xl object-cover'
                    />
                    <Image
                        src='/assets/images/social_5.jpg'
                        alt='iPhone Image'
                        width={412}
                        height={260}
                        unoptimized={true}
                        className='h-[260px] w-[412px] rounded-2xl object-cover'
                    />
                    <Image
                        src='/assets/images/social_6.jpg'
                        alt='iPhone Image'
                        width={412}
                        height={260}
                        unoptimized={true}
                        className='h-[260px] w-[412px] rounded-2xl object-cover'
                    />
                </div>
            </div>

            <div className='relative h-screen w-full bg-black' id='screen1'>
                <Image
                    src='/assets/images/background_connect.jpg'
                    alt='iPhone Image'
                    width={1440}
                    height={260}
                    unoptimized={true}
                    className='absolute left-0 top-0 h-full w-full object-cover'
                />

                <div className='absolute bottom-24 right-24 z-10 flex h-auto w-[600px] flex-col gap-6'>
                    <h2 className='text-6xl font-bold uppercase text-white'>
                        Connect <br />
                        <span className='relative right-[-32px]'>like never</span> <br />
                        <span className='relative left-[-32px]'>before</span>
                    </h2>
                    <div className='flex flex-row gap-3'>
                        <Button variant='secondary' className={cn('px-6 py-8 text-xl')}>
                            Learn more
                        </Button>

                        <h3 className='text-2xl text-white'>
                            Chat, call, and share moments with your friends through real-time messaging, voice, and
                            video.
                        </h3>
                    </div>
                </div>
            </div>
            <div className='relative h-[1240px] w-full bg-[#058189]' id='screen1'>
                <Image
                    src='/assets/icons/express.png'
                    alt='iPhone Image'
                    width={1100}
                    height={750}
                    unoptimized={true}
                    className='absolute bottom-12 right-12 h-auto w-[1100px] object-cover'
                />
                <div className='absolute left-36 top-36 z-10 flex h-auto w-[600px] flex-col gap-6'>
                    <h2 className='text-6xl font-bold uppercase text-white'>
                        Express <br />
                        <span className='relative right-[-32px] text-green-200'>yourself</span> <br />
                        <span className='relative'>boldly</span>
                    </h2>
                    <div className='flex flex-row gap-3'>
                        <Button variant='secondary' className={cn('border-0 px-6 py-8 text-xl text-[#058189]')}>
                            Learn more
                        </Button>

                        <h3 className='text-2xl text-white'>
                            Post photos, videos, and stories with fun AR filters and status updates.
                        </h3>
                    </div>
                </div>
            </div>

            <div className='relative h-[1240px] w-full bg-[#DD245C]' id='screen1'>
                <Image
                    src='/assets/icons/profile.png'
                    alt='iPhone Image'
                    width={800}
                    height={800}
                    unoptimized={true}
                    className='absolute bottom-12 left-12 h-auto w-[800px] object-cover'
                />
                <div className='absolute right-24 top-36 z-10 flex h-auto w-[600px] flex-col gap-6'>
                    <h2 className='text-6xl font-bold uppercase text-white'>
                        <span className='relative left-[-96px]'>Make your</span> <br />
                        <span className='relative right-[-42px] text-red-200'>
                            profile
                        </span> <br />
                        <span className='relative'>yours</span>
                    </h2>
                    <div className='flex flex-row gap-3'>
                        <Button variant='secondary' className={cn('border-0 px-6 py-8 text-xl text-[#DD245C]')}>
                            Learn more
                        </Button>

                        <h3 className='text-2xl text-white'>
                            Customize your profile with themes, layouts, and unique touches to reflect your style.
                        </h3>
                    </div>
                </div>
            </div>

            <div className='relative h-[1240px] w-full bg-[#04A014]' id='screen1'>
                <Image
                    src='/assets/icons/feed.png'
                    alt='iPhone Image'
                    width={820}
                    height={720}
                    unoptimized={true}
                    className='absolute bottom-12 right-12 h-auto w-[820px] object-cover'
                />
                <div className='absolute left-48 top-36 z-10 flex h-auto w-[600px] flex-col gap-6'>
                    <h2 className='text-6xl font-bold uppercase text-white'>
                        Bring <br />
                        <span className='relative left-[-32px] text-green-300'>your feed</span> <br />
                        <span className='relative right-[-24px]'>to life</span>
                    </h2>
                    <div className='flex flex-row gap-3'>
                        <Button variant='secondary' className={cn('border-0 px-6 py-8 text-xl text-[#04A014]')}>
                            Learn more
                        </Button>

                        <h3 className='text-2xl text-white'>
                            Discover and enjoy personalized content tailored just for you.
                        </h3>
                    </div>
                </div>
            </div>

            <div className='relative h-[1240px] w-full bg-[#0C5CF7]' id='screen1'>
                <Image
                    src='/assets/icons/shopping.png'
                    alt='iPhone Image'
                    width={720}
                    height={880}
                    unoptimized={true}
                    className='absolute bottom-12 left-6 h-auto w-[720px] object-cover'
                />
                <div className='absolute right-36 top-36 z-10 flex h-auto w-[700px] flex-col gap-6'>
                    <h2 className='text-end text-6xl font-bold uppercase text-white'>
                        Slide into <br />
                        <span className='relative left-[-48px] text-blue-200'>shopping center</span> <br />
                        <span className='relative left-[-84px]'>simply</span>
                    </h2>
                    <div className='flex flex-row gap-3'>
                        <Button variant='secondary' className={cn('border-0 px-6 py-8 text-xl text-[#0C5CF7]')}>
                            Learn more
                        </Button>

                        <h3 className='text-2xl text-white'>
                            Stream your moments live and engage with your audience in real-time.
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
