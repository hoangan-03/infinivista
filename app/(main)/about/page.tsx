'use client';

import React from 'react';

import {RagChatbot} from './_components/RagChatbot';

export default function AboutPage() {
    return (
        <div className='flex h-full w-full flex-col gap-6 bg-gray-50'>
            <div className='flex h-full gap-6'>
                {/* RAG Chatbot Section */}
                <div className='flex-1'>
                    <RagChatbot />
                </div>
            </div>
        </div>
    );
}
