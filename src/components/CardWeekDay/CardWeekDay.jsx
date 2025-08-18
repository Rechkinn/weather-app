import "./CardWeekDay.scss";

export default function CardWeekDay({ weatherDay, weekday }) {
  return (
    <article className="card-weekday">
      <div className="card-weekday__inner">
        <div className="card-weekday__weekday">
          <span className="card-weekday__weekday-value">{weekday}</span>
        </div>
        <div className="card-weekday__precipitation">
          <img
            src={weatherDay.day.condition.icon}
            alt={weatherDay.day.condition.text}
            className="card-weekday__precipitation-icon"
          />
        </div>
        <div className="card-weekday__temperature-max-min">
          <span className="card-weekday__temperature-max">
            {Math.round(weatherDay.day.maxtemp_c)}
          </span>
          <span className="card-weekday__temperature-min">
            {Math.round(weatherDay.day.mintemp_c)}
          </span>
        </div>
        <div className="card-weekday__date">
          <span className="card-weekday__date-value">
            {`${weatherDay.date.split("-").reverse()[0]}.${
              weatherDay.date.split("-").reverse()[1]
            }`}
          </span>
        </div>
      </div>
    </article>
  );
}
