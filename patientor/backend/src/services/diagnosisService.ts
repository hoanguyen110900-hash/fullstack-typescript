import diagnosesData from "../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getEntries,
};
