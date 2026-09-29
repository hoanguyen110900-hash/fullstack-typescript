import express from "express";
import { calculateBmi } from "./bmiCalculator.js";
import { calculateExercises } from "./exerciseCalculator.js";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight) ||
    height <= 0 ||
    weight <= 0
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  const isInvalidArray =
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    daily_exercises.some((item) => typeof item !== "number" || isNaN(item));

  const isInvalidTarget =
    typeof target !== "number" || isNaN(target) || target < 0;

  if (isInvalidArray || isInvalidTarget) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const result = calculateExercises({
    days: daily_exercises as number[],
    target: Number(target),
  });

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
