import type { NextRequest } from "next/server";
import logout from '../../../../utils/logout';

export const GET = async (req: NextRequest) => {
  return await logout(req);
};
