export interface ExerciseValues {
  days: number[];
  target: number;
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error(
      "Not enough arguments! Provide target followed by daily exercise hours.",
    );
  }
  const target = Number(args[2]);
  const rawDays = args.slice(3);
  const days = rawDays.map((val) => Number(val));

  const hasInvalidNumber = isNaN(target) || days.some((day) => isNaN(day));

  if (hasInvalidNumber) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    days,
    target,
  };
};

export const calculateExercises = (values: ExerciseValues): Result => {
  const periodLength = values.days.length;
  const trainingDays = values.days.filter((d) => d > 0).length;
  const totalHours = values.days.reduce((sum, day) => sum + day, 0);
  const average = periodLength > 0 ? totalHours / periodLength : 0;
  const getRating = (avg: number, target: number): number => {
    if (target === 0) return 3;
    const ratio = avg / target;
    if (ratio >= 0.9) {
      return 3;
    } else if (ratio >= 0.5) {
      return 2;
    } else {
      return 1;
    }
  };
  const rating = getRating(average, values.target);
  const ratingDescription =
    rating === 3 ? "Excellent" : rating === 2 ? "Meh" : "You lazy loaf";
  const success = average >= values.target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: values.target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const values = parseArguments(process.argv);
    console.log(calculateExercises(values));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
