import { NewPatientSchema, type NewPatientEntry } from "./types.ts";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

export default parseNewPatientEntry;
