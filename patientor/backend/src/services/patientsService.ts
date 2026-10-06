import patientsData from "../data/patients.ts";
import type {
  PatientNonSensitive,
  Patient,
  NewPatientEntry,
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
    };
  });
};

const getPatient = (id: string): PatientNonSensitive => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const { ssn, ...patientWithoutSsn } = patient;

  return patientWithoutSsn;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getPatient,
  addPatient,
};
