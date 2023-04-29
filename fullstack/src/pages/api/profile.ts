import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { useRouter } from "next/router";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const router = useRouter();

  if (!session) router.push("/");

  res.send(JSON.stringify(session, null, 2));
}
//
