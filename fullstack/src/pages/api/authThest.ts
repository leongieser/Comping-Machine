import { getServerSession } from "next-auth/next";
import { GetServerSidePropsResult, NextApiResponse } from "next";

export async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  return res.json({
    message: "Success",
  });
}
