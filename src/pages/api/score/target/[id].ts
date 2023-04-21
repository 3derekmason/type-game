import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/db";
import { ObjectId } from "mongodb";

async function getWordScores(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const wordScores = await db
      .collection("scores")
      .find({ title: req.query.id })
      .sort({ time: 1 })
      .toArray();
    res.status(201).json(wordScores);
  } catch (error: any) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  switch (req.method) {
    case "GET": {
      return getWordScores(req, res);
    }
  }
}
