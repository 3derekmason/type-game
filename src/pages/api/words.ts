import { connectToDatabase } from "../../../lib/db";

async function getRandomWord(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const words: any = await db.collection("words").find().toArray();
    let randomIndex = Math.floor(Math.random() * words.length);
    res.status(200).json(words[randomIndex]);
  } catch (error: any) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  switch (req.method) {
    case "GET": {
      return getRandomWord(req, res);
    }
  }
}
