import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async (req: NextRequest) => {
  let headers: HeadersInit | undefined = [
    [
      "Set-Cookie",
      `access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ],
    [
      "Set-Cookie",
      `refresh_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ],
  ];
  return NextResponse.redirect("https://oneki.github.io", {
    status: 302,
    headers,
  });
};
