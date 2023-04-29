import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.send("You are not logged in.");
  }

  console.log("session on server", session);
  console.log("req", req);

  if (req.method === "GET") {
    res.send("GET request to jamSession endpoint received");
  }

  if (req.method === "POST") {
    res.send("POST request to jamSession endpoint received");
  }

  if (req.method === "PUT") {
    res.send("PUT request to jamSession endpoint received");
  }

  if (req.method === "DELETE") {
    res.send("DELETE request to jamSession endpoint received");
  }

  res.send({
    content: "This endpoin only accepts GET, POST, PUT, and DELETE requests.",
  });
}
