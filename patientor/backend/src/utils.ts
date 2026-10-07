import {
  NewPatientSchema,
  type NewPatientEntry,
  NewEntrySchema,
  type NewEntry,
} from "./types.ts";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

export const parseNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};

export default parseNewPatientEntry;
