import "./TodayWeather.scss";

export default function TodayWeather({ weather }) {
  const nowDay = weather?.forecast?.forecastday;

  return (
    <section className="today-weather">
      <div className="today-weather__inner">
        <h1 className="today-weather__city">{weather?.location?.name}</h1>
        <img
          src={weather?.current?.condition?.icon}
          alt={weather?.current?.condition?.text}
          className="today-weather__img-precipitation"
        />
        <span className="today-weather__temperature-current">
          {Math.round(weather?.current?.temp_c)}
        </span>

        <div className="today-weather__temperature-min-max">
          <span className="today-weather__temperature-min">
            {Math.round(nowDay[0].day.mintemp_c)}
          </span>
          <span className="today-weather__temperature-max">
            {Math.round(nowDay[0].day.maxtemp_c)}
          </span>
        </div>

        <span className="today-weather__text-precipitation">
          {weather?.current?.condition?.text}
        </span>
      </div>
    </section>
  );
}
