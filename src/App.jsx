import "./App.css";

import { useEffect, useState } from "react";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import WeeklyWeather from "./components/WeeklyWeather/WeeklyWeather";
import Search from "./components/Search/Search";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Tomsk");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

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
  }, [city]);

  function getCity() {
    setCity(document.querySelector(".search__input").value);
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

  // console.log(weather);
  // console.dir(error);

  return (
    <div>
      <Search />
      {loading && <div>Загрузка...</div>}

      {error && <div>Ошибка: {error.message}</div>}

      {weather && !loading && !error && (
        <>
          <TodayWeather weather={weather} />
          <WeeklyWeather />
        </>
      )}
    </div>
  );
}
