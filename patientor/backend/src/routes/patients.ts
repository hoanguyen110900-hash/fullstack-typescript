import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { PatientNonSensitive } from "../types.ts";
import parseNewPatientEntry from "../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.send(patientsService.getEntries());
});

router.get("/:id", (req, res: Response<PatientNonSensitive>) => {
  const patient = patientsService.getPatient(req.params.id);

  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.post("/", (_req, res) => {
  res.send("add a new patient");
});

export default router;
