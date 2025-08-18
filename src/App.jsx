import { useEffect, useState } from "react";
import SectionTodayWeather from "./components/SectionTodayWeather/SectionTodayWeather";
import SectionWeeklyWeather from "./components/SectionWeeklyWeather/SectionWeeklyWeather";
import SectionSearch from "./components/SectionSearch/SectionSearch";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Tomsk");
  const [updateWeather, setUpdateWeather] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // Если приложение перестало работать, возможно
        // необходимо поменять ключ. Взять его можно
        // на сайте https://www.weatherapi.com/api-explorer.aspx
        const key = "09720ec193bd45fc8f0110906251508";

        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&aqi=no&alerts=no`
        );

        if (!response.ok) {
          if (response.status === 400)
            throw new Error(`Введено некорректное название города`);
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setError(null);
        setWeather(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    console.log("зашли в useEffect");
  }, [city]);

  function getCity() {
    setCity(document.querySelector(".search__input").value);
  }

  function getWeekDay(days = "one") {
    const arrWeekDays = [
      "Monday", // 1
      "Tuesday", // 2
      "Wednesday", // 3
      "Thursday", // 4
      "Friday", // 5
      "Saturday", // 6
      "Sunday", // 0
    ];

    if (days === "all") {
      return arrWeekDays;
    }
    return arrWeekDays[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  }

  document.addEventListener("searchWeather", getCity);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      document.dispatchEvent(
        new CustomEvent("keydownEnter", { bubbles: true })
      );
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("search__input")) {
      document.addEventListener("keydownEnter", getCity);
    } else {
      document.removeEventListener("keydownEnter", getCity);
    }
  });

  return (
    <>
      <SectionSearch />

      {loading && <Loader />}

      {error && <div>Ошибка: {error.message}</div>}

      {weather && !loading && !error && (
        <>
          <SectionTodayWeather weather={weather} weekDay={getWeekDay()} />

          <SectionWeeklyWeather
            weather={weather}
            arrWeekdays={getWeekDay("all")}
          />
        </>
      )}
    </>
  );
}
