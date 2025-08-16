import "./Search.scss";

function getCity() {
  document.dispatchEvent(new CustomEvent("searchWeather", { bubbles: true }));
}

export default function Input() {
  return (
    <section className="search">
      <div className="search__inner">
        <div className="search__wrapper">
          <input
            type="text"
            placeholder="Input city"
            className="search__input"
          />
          <button className="search__button" onClick={getCity}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/980px-Magnifying_glass_icon.svg.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </section>
  );
}
