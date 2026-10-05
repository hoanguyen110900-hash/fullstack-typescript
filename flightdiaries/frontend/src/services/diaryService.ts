import axios from "axios";
import type {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry,
} from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const createDiary = async (
  object: NewDiaryEntry,
): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Failed to create diary entry");
    }
    throw new Error("An unexpected error occurred");
  }
};
