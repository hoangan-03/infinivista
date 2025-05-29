'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {Icon, Spinner} from '@/components/commons';
import {Button, Input, ScrollArea} from '@/components/ui';
import {cn} from '@/lib/utils';
import {IRagQuery} from '@/modules/rag/rag.interface';
import {RagService} from '@/modules/rag/rag.service';

interface ChatMessage {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
    isLoading?: boolean;
}

type FormValues = IRagQuery;

export const RagChatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'bot',
            content:
                "Hello! I'm your AI assistant. I can help you with questions about Infinivista, its features, and how to use the platform. What would you like to know?",
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            query: '',
        },
    });

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (streamIntervalRef.current) {
                clearInterval(streamIntervalRef.current);
            }
        };
    }, []);

    const streamText = (text: string, messageId: string) => {
        // Clear any existing interval
        if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
        }

        const words = text.split(' ');
        let currentIndex = 0;

        streamIntervalRef.current = setInterval(() => {
            if (currentIndex < words.length) {
                const partialContent = words.slice(0, currentIndex + 1).join(' ');

                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === messageId
                            ? {
                                  ...msg,
                                  content: partialContent,
                                  isLoading: false,
                              }
                            : msg
                    )
                );

                currentIndex++;
            } else {
                if (streamIntervalRef.current) {
                    clearInterval(streamIntervalRef.current);
                    streamIntervalRef.current = null;
                }
                setIsLoading(false);
            }
        }, 40); // 100ms delay between words - adjust for desired speed
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!data.query.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: data.query.trim(),
            timestamp: new Date(),
        };

        const loadingMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: '',
            timestamp: new Date(),
            isLoading: true,
        };

        setMessages((prev) => [...prev, userMessage, loadingMessage]);
        setIsLoading(true);
        reset();

        try {
            const response = await RagService.createRagQuery({payload: data});

            // Start streaming the response word by word
            streamText(response.data.data.answer, loadingMessage.id);
        } catch (error) {
            console.error('Error querying RAG service:', error);

            // Stream error message as well
            streamText(
                'Sorry, I encountered an error while processing your question. Please try again.',
                loadingMessage.id
            );
        }
    };
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const renderMessageContent = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const boldText = part.slice(2, -2);
                return (
                    <strong key={index} className='font-bold'>
                        {boldText}
                    </strong>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };
    const suggestedQuestions = [
        'How do I create a new post?',
        'How can I connect with friends?',
        'What privacy settings are available?',
        'How do I join or create groups?',
        'How does messaging work?',
        'What this platform help KOL?',
        'How do I manage my profile settings?',
        'How this platform help business?',
        'What are the latest updates and features?',
        'Is this platform good for gaming communities?',
    ];

    const handleSuggestionClick = (question: string) => {
        onSubmit({query: question});
    };
    const clearChat = () => {
        // Stop any ongoing streaming
        if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
        }

        setIsLoading(false);
        setMessages([
            {
                id: '1',
                type: 'bot',
                content:
                    "Hello! I'm your AI assistant. I can help you with questions about Infinivista, its features, and how to use the platform. What would you like to know?",
                timestamp: new Date(),
            },
        ]);
    };

    return (
        <div className='flex h-full flex-col rounded-lg bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                        <Icon name='chat-circle' className='text-blue-600' />
                    </div>
                    <div>
                        <h3 className='font-bold text-gray-900'>AI Assistant</h3>
                        <p className='text-sm text-gray-500'>Ask me anything about Infinivista</p>
                    </div>
                </div>
                <Button variant='cancel' size='default' onClick={clearChat} className='flex items-center gap-2'>
                    <Icon name='refresh' width={16} height={16} />
                    Clear Chat
                </Button>
            </div>
            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className='flex-1 p-4'>
                <div className='space-y-4'>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn('flex', message.type === 'user' ? 'justify-end' : 'justify-start')}
                        >
                            <div
                                className={cn(
                                    'max-w-[80%] rounded-lg px-4 py-3',
                                    message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                                )}
                            >
                                {message.isLoading ? (
                                    <div className='flex items-center gap-2'>
                                        <Spinner width={16} height={16} />
                                        <span className='text-sm'>Thinking...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className='whitespace-pre-wrap break-words'>
                                            {renderMessageContent(message.content)}
                                        </div>
                                        <p
                                            className={cn(
                                                'mt-2 text-xs',
                                                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                            )}
                                        >
                                            {formatTime(message.timestamp)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>{' '}
            {/* Suggested Questions */}
            <div className='border-t border-gray-200 p-4'>
                <div className='mb-3'>
                    {' '}
                    <div className='flex flex-wrap gap-2'>
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(question)}
                                disabled={isLoading}
                                className='rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                {renderMessageContent(question)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
                    <div className='flex-1'>
                        <Controller
                            name='query'
                            control={control}
                            rules={{
                                required: 'Please enter a question',
                                minLength: {
                                    value: 1,
                                    message: 'Question cannot be empty',
                                },
                            }}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    placeholder='Ask me anything about Infinivista...'
                                    className={cn('w-full', errors.query && 'border-red-500 focus:border-red-500')}
                                    disabled={isLoading}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(onSubmit)();
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                    <Button type='submit' disabled={isLoading} className='flex items-center gap-2'>
                        {isLoading ? (
                            <Spinner width={16} height={16} />
                        ) : (
                            <Icon name='paper-plane' width={16} height={16} />
                        )}
                        Send
                    </Button>
                </form>
                {errors.query && <p className='mt-1 text-sm text-red-500'>{errors.query.message}</p>}
            </div>
        </div>
    );
};
