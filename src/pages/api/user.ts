import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { hash } from "../../../lib/hash";

async function checkForUser(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const user = await db.collection("users").find({}).toArray();
    if (user.length > 0) {
      return res.status(200).json({
        message: "User exists",
        success: true,
      });
    }
    return res.status(200).json({
      message: "No user found",
      success: false,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

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
    return res.status(201).json({
      message: "Added user data",
      success: true,
    });
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
    case "GET": {
      return checkForUser(req, res);
    }
    case "DELETE": {
      return deleteUser(req, res);
    }
  }
}