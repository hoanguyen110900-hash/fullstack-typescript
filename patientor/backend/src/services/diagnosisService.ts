import diagnosesData from "../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnosis = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getDiagnosis,
};
