import { AxiosError } from 'axios';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cors from '../../../utils/cors';

type JsonResponse = {
  username: string;
  roles?: string[];
  error?: string;
}

export const OPTIONS = async (req: NextRequest) => {
  return cors(req);
}

export const POST = async (req: NextRequest) => {
  let status = 200;
  let headers: HeadersInit | undefined;
  const body = await req.json();
  const username = body.username;
  const password = body.password;
  let jsonResponse: JsonResponse = {
    username
  };
  
  try {
    if ((username === 'demo' && password !== 'demo') ||
      username === 'admin' && password !== 'admin'
    ) {
      status = 401;
      return NextResponse.json({ error: 'Invalid username / password'}, { status })
    }

    if (username === 'admin') jsonResponse.roles = ['admin'];
    const jsonResponseString = JSON.stringify(jsonResponse);
    
    headers = [
      [
        "Set-Cookie",
        `onekijs-example-profile=${jsonResponseString}; path=/; HttpOnly; SameSite=Strict`,
      ],
    ];
  } catch (error) {
    status = 500;
    if (error instanceof AxiosError) {
      jsonResponse.error = error.message;
    } else if (typeof error === "string") {
      jsonResponse.error = error;
    } else if (error instanceof Error) {
      jsonResponse.error = error.message;
    }
  }
  return NextResponse.json(jsonResponse, { status, headers });
};
