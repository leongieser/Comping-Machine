import { faChessKing } from "@fortawesome/free-regular-svg-icons";
import prisma from "../../../libs/prismadb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, creationDate, soundbank_name, pad_sound, pad_track } =
      req.body;

    console.log(req.body);
    // const trackExists = await prisma.Track.findUnique({
    //   where: { name: name } })
    // if (!trackExists) {
    // console.log('req body', req.body)

    delete req.body.soundbank_name;

    const result = await prisma.Session.create({
      data: {
        name,
        creationDate,
        pad_sound,
        pad_track,
        drumkit: soundbank_name, //TODO investigate
        ...req.body,
      },
    });
    return res.status(201).send(result);
  } catch (error) {
    console.log("things failed in api/save.ts: ", error);
    return res.status(400).end();
  }
}
