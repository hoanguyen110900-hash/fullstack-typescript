import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { PatientNonSensitive, Patient } from "../types.ts";
import { parseNewPatientEntry, parseNewEntry } from "../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.send(patientsService.getEntries());
});

router.get("/:id", (req, res: Response<Patient>) => {
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

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = parseNewEntry(req.body);

    const addedEntry = patientsService.addEntry(patientId, newEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
