import type { TotalProps } from "../types";

const Total = ({ parts }: TotalProps) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <p>
      <strong>Number of exercises {totalExercises}</strong>
    </p>
  );
};

export default Total;
