import { NextResponse } from 'next/server';
import { verifyToken } from '@/middlewares/auth';


export async function POST(req) {
    const body = await req.json();

    const { token } = body;

    const verifyed = verifyToken(token)

    if (verifyed != null) {
        return NextResponse.json({ message: "token valid." }, { status: 200 });
    }
    else
        return NextResponse.json({ message: "token invalid", }, { status: 401 });



}