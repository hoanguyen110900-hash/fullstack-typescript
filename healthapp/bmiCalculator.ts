export interface BmiValues {
  heightCm: number;
  weightKg: number;
}

export const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const heightCm = Number(args[2]);
  const weightKg = Number(args[3]);

  if (!isNaN(heightCm) && !isNaN(weightKg)) {
    return {
      heightCm,
      weightKg,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightInMeters = heightCm / 100;
  const bmi = weightKg / Math.pow(heightInMeters, 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { heightCm, weightKg } = parseArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
