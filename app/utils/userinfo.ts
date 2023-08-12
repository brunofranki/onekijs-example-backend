import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { Idp } from '../types/types';

export default async (idp: Idp, req: NextRequest) => {
  let status = 200;
  let jsonResponse = {};
  if (!idp.access_token) {
    status = 401;
  } else {
    try {
      const response = await axios({
        method: "get",
        url: idp.userinfoEndpoint,
        headers: {
          Authorization: `Bearer ${idp.access_token}`,
        },
      });
      status = response.status;
      jsonResponse = response.data;
    } catch (error) {
      status = 500;
      if (typeof error === "string") {
        jsonResponse = { error };
      } else if (error instanceof Error) {
        jsonResponse = { error: error.message };
      }
    }
  }
  return NextResponse.json(jsonResponse, { status });
};
