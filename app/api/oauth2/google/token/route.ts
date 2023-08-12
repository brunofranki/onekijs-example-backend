import type { NextRequest } from "next/server";
import { Idp } from "../../../../types/types";
import token from '../../../../utils/token';

export const POST = async (req: NextRequest) => {
  const idp: Idp = {
    userinfoEndpoint:
      "https://openidconnect.googleapis.com/v1/userinfo?scope=openid%20profile%20email",
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  };
  return await token(idp, req);
};
