import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.enum(Gender),
  occupation: z.string().min(1, "Occupation is required"),
});

export type Gender = (typeof Gender)[keyof typeof Gender];

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type PatientNonSensitive = Omit<Patient, "ssn">;
