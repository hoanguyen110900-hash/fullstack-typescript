import type { ContentProps } from "../types";
import Part from "./Part";

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
