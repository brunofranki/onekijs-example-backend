import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
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
  let headers: HeadersInit | undefined;
  const formData = await req.formData();
  const username = formData.get('username')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const redirect_uri = formData.get('redirect_uri')?.toString() ?? 'http://localhost';
  let jsonResponse: JsonResponse = {
    username
  };
  try {
    if ((username === 'demo' && password !== 'demo') ||
      username === 'admin' && password !== 'admin'
    ) {
      return NextResponse.json({ error: 'Invalid username / password'}, { status: 401 })
    }

    if (username === 'admin') jsonResponse.roles = ['admin'];
    const jsonResponseString = JSON.stringify(jsonResponse);    
    
    headers = [
      [
        "Set-Cookie",
        `onekijs-example-profile=${jsonResponseString}; path=/; HttpOnly; SameSite=None; Secure`,
      ],
    ];
  } catch (error) {
    return NextResponse.json({ error: 'unexpected error' }, { status: 500});
  }

  return NextResponse.redirect(redirect_uri, { status: 302, headers });
  
};
