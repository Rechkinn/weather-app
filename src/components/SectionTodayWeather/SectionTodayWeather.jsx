import "./SectionTodayWeather.scss";

export default function SectionTodayWeather({ weather, weekDay }) {
  const nowDay = weather?.forecast?.forecastday;

  return (
    <section className="today-weather">
      <div className="today-weather__inner">
        <h1 className="today-weather__city">
          {weather?.location?.name}

          <img
            src={weather?.current?.condition?.icon}
            alt={weather?.current?.condition?.text}
            className="today-weather__img-precipitation"
          />
        </h1>

        <div className="today-weather__temperature-current">
          <span className="today-weather__temperature-current-value">
            {Math.round(weather?.current?.temp_c)}
          </span>
        </div>

        {/* <div className="today-weather__temperature-min-max">
          <span className="today-weather__temperature-min">
            {Math.round(nowDay[0].day.mintemp_c)}
          </span>

          <span className="today-weather__temperature-max">
            {Math.round(nowDay[0].day.maxtemp_c)}
          </span>
        </div> */}

        <div className="today-weather__weekday">
          <span className="today-weather__weekday-value">{weekDay}</span>
        </div>

        <span className="today-weather__text-precipitation">
          {weather?.current?.condition?.text}
        </span>
        <hr className="today-weather__hr" />
      </div>
    </section>
  );
}
