import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";

async function getPublicScores(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const publicScores = await db
      .collection("scores")
      .find({ public: true })
      .toArray();
    res.status(201).json(publicScores);
  } catch (error: any) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addScore(
  req: {
    body: {
      title: string;
      time: number;
      count: number;
      userId: string;
      public: boolean;
    };
  },
  res: any
) {
  try {
    let { db } = await connectToDatabase();
    const newScore = {
      userId: req.body.userId,
      public: req.body.public,
      title: req.body.title,
      time: req.body.time,
      count: req.body.count,
      created_at: new Date().toISOString(),
    };
    await db.collection("scores").insertOne(newScore);
    return res.status(201).json({
      message: `Added score to db`,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: new Error().message,
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
      return getPublicScores(req, res);
    }
    case "POST": {
      return addScore(req, res);
    }
  }
}
