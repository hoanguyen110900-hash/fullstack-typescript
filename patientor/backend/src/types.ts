import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

const HealthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk),
]);

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

const NewHealthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  healthCheckRating: HealthCheckRatingSchema,
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const NewHospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const NewOccupationalHealthcareEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.enum(Gender),
  occupation: z.string().min(1, "Occupation is required"),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
]);

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}
export type PatientNonSensitive = Omit<Patient, "ssn">;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;
