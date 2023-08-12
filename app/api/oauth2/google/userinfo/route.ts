import type { NextRequest } from "next/server";
import { Idp } from "../../../../types/types";
import userinfo from '../../../../utils/userinfo';

export const GET = async (req: NextRequest) => {
  const idp: Idp = {
    userinfoEndpoint:
      "https://openidconnect.googleapis.com/v1/userinfo?scope=openid%20profile%20email",
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    clientId: process.env.NEXT_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || '',
    access_token: req.headers.get('Authorization')?.substring(7),
  };
  return await userinfo(idp, req);
};
