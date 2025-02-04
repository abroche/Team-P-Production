import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { lostAndFound } from "common/src/lostAndFoundType.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const input: lostAndFound = req.body;

  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.location,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Lost and Found",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.name,
        priority: input.priority,
      },
    });

    if (id1.length >= 1) {
      console.log("SOMETHING BAD!!!!!!");
      res.sendStatus(400);
      return;
    }

    await PrismaClient.generalService.create({
      data: {
        type: "Lost and Found",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.location,
        emp_name: input.name,
        priority: input.priority,
      },
    });

    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Lost and Found",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.name,
        priority: input.priority,
      },
    });

    const findEmail = await PrismaClient.user.findMany({
      where: {
        username: input.name,
      },
    });
    if (input.status == "Closed") {
      await PrismaClient.todo.create({
        data: {
          task: "Complete lost and found request #" + findID[0].id,
          dueDate: "",
          serv_req_id: findID[0].id,
          priority: input.priority,
          notes: "Lost " + input.type + " found in " + input.location,
          complete: true,
          email: findEmail[0].email,
        },
      });
    }
    if (input.status != "Closed") {
      await PrismaClient.todo.create({
        data: {
          task: "Complete lost and found request #" + findID[0].id,
          dueDate: "",
          serv_req_id: findID[0].id,
          priority: input.priority,
          notes: "Lost " + input.type + " found in " + input.location,
          complete: false,
          email: findEmail[0].email,
        },
      });
    }

    if (input.date != undefined) {
      await PrismaClient.lostItem.create({
        data: {
          id: findID[0].id,
          date: input.date.toString(),
          description: input.objectDesc,
          type: input.type,
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.get("/", async function (req: Request, res: Response) {
  const data = await PrismaClient.generalService.findMany({
    where: {
      type: "Lost and Found",
    },
    include: {
      lost_location: true,
    },
  });
  try {
    res.send(data);
  } catch (e) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  try {
    await PrismaClient.generalService.delete({
      where: {
        id: id,
      },
    });

    await PrismaClient.todo.deleteMany({
      where: {
        serv_req_id: id,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.post("/update", async function (req: Request, res: Response) {
  const id = req.body.id;
  const status = req.body.status;

  try {
    await PrismaClient.generalService.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    if (status == "Closed") {
      await PrismaClient.todo.updateMany({
        where: {
          serv_req_id: id,
        },
        data: {
          complete: true,
        },
      });
    } else {
      await PrismaClient.todo.updateMany({
        where: {
          serv_req_id: id,
        },
        data: {
          complete: false,
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});
export default router;
