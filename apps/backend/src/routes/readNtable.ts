import express, { Router } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// Put the POST PUT GET DELETE REQUESTS HERE
/*
formula: router.COMMAND(req, res)...
 */
router.get("/", async (req, res) => {
  try {
    res.status(200);
    return await PrismaClient.nodes.findMany();
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while fetching the data." });
    return;
  }
});
export default router;
