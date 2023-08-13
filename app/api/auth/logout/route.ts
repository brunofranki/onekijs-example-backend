import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json(null, { status: 200 });
};
