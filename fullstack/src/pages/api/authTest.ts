import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  res.send(JSON.stringify(session, null, 2));
}
//
