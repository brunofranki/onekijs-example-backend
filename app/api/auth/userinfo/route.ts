import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  let status = 200;
  const cookies = req.cookies;
  const profile = cookies.get('onekijs-example-profile');
  if (profile) {
    const jsonProfile = JSON.parse(profile.value);
    return NextResponse.json(jsonProfile, { status });
  } else {
    return NextResponse.json({ error: 'Not authenticated'}, { status: 401 })
  }
};
