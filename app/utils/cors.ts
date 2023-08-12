import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async (request: NextRequest) => {

  return NextResponse.json(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400000",
    }
  })
}