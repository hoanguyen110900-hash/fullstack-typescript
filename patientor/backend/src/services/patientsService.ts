import patientsData from "../data/patients.ts";
import type {
  PatientNonSensitive,
  Patient,
  NewPatientEntry,
  Entry,
  NewEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getEntries = (): PatientNonSensitive[] => {
  return patientsData.map((patientWithoutSsn) => {
    return {
      name: patientWithoutSsn.name,
      dateOfBirth: patientWithoutSsn.dateOfBirth,
      gender: patientWithoutSsn.gender,
      occupation: patientWithoutSsn.occupation,
      id: patientWithoutSsn.id,
      entries: patientWithoutSsn.entries,
    };
  });
};

const getPatient = (id: string): Patient => {
  const patient = patientsData.find((p) => p.id === id);
  console.log("PATIENT DATA:", patient);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patientsData.find((patient) => patient.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getPatient,
  addPatient,
  addEntry,
};
