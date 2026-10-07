export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type HealthCheckRating = 0 | 1 | 2 | 3;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

export type EntryType = Entry["type"];

export type NewBaseEntry = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
};

export type NewHealthCheckEntry = NewBaseEntry & {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

export type NewOccupationalHealthcareEntry = NewBaseEntry & {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export type NewHospitalEntry = NewBaseEntry & {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
};

export type NewEntry =
  | NewHealthCheckEntry
  | NewOccupationalHealthcareEntry
  | NewHospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientNonSensitive = Omit<Patient, "ssn">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
