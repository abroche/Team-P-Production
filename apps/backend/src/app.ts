import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import exampleRouter from "./routes/example.ts";
import importRouter from "./routes/import.ts";
import flowerRequest from "./routes/flowerRequest.ts";
import loginRequest from "./routes/login.ts";
import readRouter from "./routes/read.ts";
import roomScheduler from "./routes/roomSchedulingRequest.ts";
import medicalDeviceDelivery from "./routes/medicalDeviceDelivery.ts";
import inventory from "./routes/inventory.ts";
import lostAndFound from "./routes/lostAndFound.ts";
import medicineRequest from "./routes/medicineRequest.ts";
import { auth } from "express-oauth2-jwt-bearer";

const app: Express = express(); // Setup the backend

// Setup generic middleware
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/api/high-score", exampleRouter);
app.use("/api/roomSchedulingRequest", roomScheduler);

app.use("/healthcheck", (req, res) => {
  res.status(200).send();
});

app.use("/api/import", importRouter);
app.use("/api/login", loginRequest);
app.use("/api/read", readRouter);
app.use("/api/flowerRequest", flowerRequest);
app.use("/api/inventory", inventory);
app.use("/api/medicalDevice", medicalDeviceDelivery);
app.use("/api/lostAndFound", lostAndFound);
app.use("/api/medicineRequest", medicineRequest);
// Enable auth0 enforcement
app.use(
  auth({
    audience: "/api",
    issuerBaseURL: "https://dev-xiwtn1gzwzvxk2ab.us.auth0.com",
    tokenSigningAlg: "RS256",
  }),
);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
