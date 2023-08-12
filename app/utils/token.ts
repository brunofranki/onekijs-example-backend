import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import qs from "query-string";
import { Idp } from '../types/types';

export default async (idp: Idp, req: NextRequest) => {
  let status = 200;
  let jsonResponse = {};
  let headers: HeadersInit | undefined;
  const formData = await req.formData();
  console.log(formData.get('grant_type'));
  try {
    console.log('send HTTP request');
    const response = await axios({
      method: "post",
      url: idp.tokenEndpoint, //https://auth.oneki.net/oauth2/token
      data: qs.stringify({
        grant_type: formData.get('grant_type'),
        code: formData.get('code'),
        redirect_uri: formData.get('redirect_uri'),
        code_verifier: formData.get('code_verifier'),
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      auth: {
        username: idp.clientId,
        password: idp.clientSecret,
      },
    });
    console.log(response);
    status = response.status;
    jsonResponse = response.data;
    headers = [
      [
        "Set-Cookie",
        `access_token=${response.data.access_token}; path=/; HttpOnly; SameSite=Stric; Secure`,
      ],
      [
        "Set-Cookie",
        `refresh_token=${response.data.refresh_token}; path=/; HttpOnly; SameSite=Stric; Secure`,
      ],
    ];
  } catch (error) {
    status = 500;
    if (error instanceof AxiosError) {
      jsonResponse = { error: error.message };
    } else if (typeof error === "string") {
      jsonResponse = { error };
    } else if (error instanceof Error) {
      jsonResponse = { error: error.message };
    }
  }
  console.log("return response", jsonResponse);
  return NextResponse.json(jsonResponse, { status, headers });
};
