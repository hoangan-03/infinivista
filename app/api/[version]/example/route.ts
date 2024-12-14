import {NextResponse} from 'next/server';

import {PaginationConfigResponse, ResponseAPI} from '@/modules/api.interface';
import {IExample} from '@/modules/example/example.interface';

export async function GET() {
    // TODO: implement try-catch block, requestHandler, errorHandler
    const example: ResponseAPI<PaginationConfigResponse<IExample[]>> = {
        status: 200,
        message: 'Success',
        data: {
            pagination: {
                currentPage: 1,
                perPage: 10,
                totalItems: 100,
            },
            data: [
                {
                    id: '1',
                    name: 'Example 1',
                    description: 'This is example 1',
                },
                {
                    id: '2',
                    name: 'Example 2',
                    description: 'This is example 2',
                },
            ],
        },
    };
    return NextResponse.json(example);
}
