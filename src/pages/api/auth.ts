import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { compare } from "../../../lib/hash";

async function loginUser(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const user: any = await db
      .collection("users")
      .findOne({ username: req.body.username });
    if (!user) {
      res.status(400).send("Username does not exist");
    }
    if (!compare(req.body.password, user.password)) {
      res.status(400).send("Passwords do not match");
    } else {
      res.status(200).send(user);
    }
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
    case "POST": {
      return loginUser(req, res);
    }
  }
}