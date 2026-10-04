import patientsData from "../data/patients.ts";
import type {
  PatientNonSensitive,
  Patient,
  NewPatientEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getEntries = (): PatientNonSensitive[] => {
  return patientsData.map(({ ssn, ...patientWithoutSsn }) => patientWithoutSsn);
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
  addPatient,
};
