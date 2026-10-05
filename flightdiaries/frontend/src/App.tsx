import { useEffect, useState, type SyntheticEvent } from "react";
import { Weather, Visibility } from "./types";
import type {
  NonSensitiveDiaryEntry,
  Weather as WeatherType,
  Visibility as VisibilityType,
} from "./types";
import { createDiary, getAllDiaries } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<WeatherType>(Weather.Sunny);
  const [visibility, setVisibility] = useState<VisibilityType>(
    Visibility.Great,
  );
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  useEffect(() => {
    getAllDiaries()
      .then((data) => {
        setDiaries(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          showError(err.message);
        }
      });
  }, []);

  const handleDiaryCreation = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = await createDiary({
        date,
        weather,
        visibility,
        comment,
      });

      setDiaries(diaries.concat(newEntry));
      setDate("");
      setComment("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        showError(err.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Add new entry</h2>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleDiaryCreation}>
        <div>
          <label htmlFor="date-input">
            <strong>Date: </strong>
          </label>

          <input
            id="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div style={{ margin: "0.5rem 0" }}>
          <strong>Visibility: </strong>

          {Object.values(Visibility).map((v) => (
            <label key={v} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div style={{ margin: "0.5rem 0" }}>
          <strong>Weather: </strong>

          {Object.values(Weather).map((w) => (
            <label key={w} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div style={{ margin: "0.5rem 0" }}>
          <label htmlFor="comment-input">
            <strong>Comment: </strong>
          </label>

          <input
            id="comment-input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "0.5rem" }}>
          add
        </button>
      </form>

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: "1rem" }}>
          <h3>{diary.date}</h3>

          <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
