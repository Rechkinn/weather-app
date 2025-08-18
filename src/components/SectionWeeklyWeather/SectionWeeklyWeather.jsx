import CardWeekDay from "../CardWeekDay/CardWeekDay";
import "./SectionWeeklyWeather.scss";

export default function SectionWeeklyWeather({ weather, arrWeekdays }) {
  const arrForecast = weather.forecast.forecastday;

  return (
    <section className="weekly-weather">
      <div className="weekly-weather__inner">
        {arrForecast.map((_, i) => {
          return (
            <CardWeekDay
              key={arrForecast[i].date}
              weatherDay={arrForecast[i]}
              weekday={
                arrWeekdays[
                  new Date(arrForecast[i].date).getDay() === 0
                    ? 6
                    : new Date(arrForecast[i].date).getDay() - 1
                ]
              }
            />
          );
        })}
      </div>
    </section>
  );
}
