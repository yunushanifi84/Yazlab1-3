import { NextResponse } from 'next/server';
import {  checkToken } from '@/middlewares/auth';


export function middleware(req) {


    if (checkToken(req)) {
        console.log("doğulama isteği");

        return NextResponse.next();

    }
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

export const config = {
    matcher: ['/api/admin/:path*'],
};