import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { hash } from "../../../lib/hash";

async function newUser(req: any, res: any) {
  let hashedPassword;

  try {
    hashedPassword = hash(req.body.password, {});
  } catch (error: any) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }

  try {
    let { db } = await connectToDatabase();
    let newUser = {
      username: req.body.username,
      password: hashedPassword,
      created: new Date().toISOString(),
      public: req.body.isPublic,
    };
    // Check if username exists
    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });
    if (user) {
      return res.status(500).json({
        message: "Username already exists",
        success: false,
      });
    }
    // Add new user to db with hashed password
    await db.collection("users").insertOne(newUser);
    // return a message
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deleteUser(req: any, res: any) {
  const id = req.query.id;
  const objId = new ObjectId(id);
  try {
    const { db } = await connectToDatabase();
    await db.collection("users").deleteOne({ _id: objId });
    return res.status(201).json(`Deleted user ${objId}`);
  } catch (error: any) {
    return res.status(200).json({
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
      return newUser(req, res);
    }
    case "DELETE": {
      return deleteUser(req, res);
    }
  }
}
