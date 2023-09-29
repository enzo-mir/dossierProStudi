import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FiSunset, FiSunrise } from "react-icons/fi";

const Card = ({ locationInformation, airQuality, weatherInformation }) => {
  let weatherDailyInformation = weatherInformation.daily;
  let dayDateNumber = weatherDailyInformation.time;
  let tempHourly = weatherInformation.hourly.temperature_2m;
  let windHourly = weatherInformation.hourly.windspeed_10m;
  let airQualityHourly = airQuality.european_aqi;

  let tableTemperature = [];
  let tableWind = [];
  let tableAirQuality = [];

  tempHourly.map((temp, i) => {
    i % 24 == 0
      ? (tableTemperature.push(average(tempHourly.slice(i, i + 24))),
        tableWind.push(average(windHourly.slice(i, i + 24))),
        tableAirQuality.push(average(airQualityHourly.slice(i, i + 24))))
      : null;
  });

  function average(numb) {
    let sum = 0;
    numb.forEach((item) => {
      sum += item;
    });
    return Math.round(sum / numb.length);
  }

  function weatherCode(code) {
    if (code >= 0 && code <= 49)
      return "Aucune précipitation à la station au moment de l'observation";
    if (code >= 50 && code <= 99)
      return "Précipitations à la station au moment de l'observation";
  }

  function airQ(aq) {
    if (aq <= 10) return "bon";
    if (aq <= 20) return "moyen";
    if (aq <= 30) return "dégradé";
    if (aq <= 50) return "mauvais";
    if (aq <= 75) return "très mauvais";
    if (aq > 75) return "extrêmement mauvais";
  }

  function displayCard(e) {
    document.querySelectorAll(".active").forEach((element) => {
      element.removeAttribute("class");
      element.scrollTo(0, 0);
    });

    e.classList.add("active");
  }

  return (
    <Wrapper>
      {dayDateNumber.map((info, i) => {
        return (
          <article key={i} className={i == 0 ? "active" : null}>
            <aside>
              <div>
                <sub>Latitude : {locationInformation[0]} </sub>
                <sub>Longitude : {locationInformation[1]}</sub>
              </div>
              <h1>{locationInformation[2]}</h1>
              <h2>{locationInformation[3]}</h2>
              <h1>{tableTemperature[i]}°</h1>
              <div className="infoSupp">
                <div className="tempAvarage">
                  <p>
                    <FontAwesomeIcon icon={faAngleUp} />
                    {weatherDailyInformation.temperature_2m_max[i]}°
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faAngleDown} />
                    {weatherDailyInformation.temperature_2m_min[i]}°
                  </p>
                </div>
                <div className="sunAverage">
                  <p>
                    <FiSunrise />
                    {weatherDailyInformation.sunrise[i].slice(
                      weatherDailyInformation.sunrise[i].indexOf("T") + 1
                    )}
                  </p>
                  <p>
                    <FiSunset />
                    {weatherDailyInformation.sunset[i].slice(
                      weatherDailyInformation.sunset[i].indexOf("T") + 1
                    )}
                  </p>
                </div>
              </div>
            </aside>
            <aside>
              <p>
                Précipitation : {weatherDailyInformation.precipitation_sum[i]}mm
              </p>
              <p>{weatherCode(weatherDailyInformation.weathercode[i])}</p>
              <p>vent : ~ {tableWind[i]} km/h</p>
              <p>
                Qualité de l'air : {tableAirQuality[i]}ppm (
                {airQ(tableAirQuality[i])})
              </p>
              <p>
                Indice UV :{" "}
                {Math.round(weatherDailyInformation.uv_index_max[i])} (
                {Math.round(weatherDailyInformation.uv_index_max[i]) < 3
                  ? "faible"
                  : Math.round(weatherDailyInformation.uv_index_max[i]) < 6
                  ? "modéré"
                  : "élevé"}
                )
              </p>
            </aside>
            <h1 onClick={(e) => displayCard(e.target.parentElement)}>
              {weatherDailyInformation.time[i]}
            </h1>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 800px) {
    gap: 5vw;
  }
  gap: 3vh;

  & article {
    position: relative;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    place-items: center;
    gap: 20px;
    transition: all 0.5s ease-out;
    overflow-x: hidden;
    @media screen and (max-width: 800px) {
      overflow-y: scroll;
    }
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(50px);
    border-radius: 1rem;

    @media screen and (min-width: 800px) {
      height: clamp(250px, 50vh, 100%);
      width: 50px;
    }

    @media screen and (max-width: 800px) {
      height: 50px;
      width: 80vw;
    }

    & aside {
      opacity: 0;
    }

    &.active {
      @media screen and (max-width: 800px) {
        height: clamp(250px, 70vh, 70vh);
      }

      @media screen and (min-width: 800px) {
        width: clamp(500px, 50%, 750px);
      }

      & aside {
        opacity: 1;
      }
    }

    & sub {
      font-size: var(--font-size-tinny);
    }

    & aside {
      padding: 1em;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      transition: 0.5s ease-out;
      width: 75%;

      &:first-child {
        display: grid;
        grid-area: 1 / 1 / 2 / 2;
        grid-template-rows: auto 0.3fr 0.3fr 1fr 0.3fr;
        row-gap: 2cqh;
        height: clamp(150px, 80%, 500px);

        & > h1 {
          font-size: var(--font-size-regularpls);
        }

        & > h1:nth-child(4) {
          display: grid;
          place-items: center;
          text-align: center;
          font-size: var(--font-size-big);
        }
        & h1,
        h2 {
          text-align: center;
        }

        & > div {
          :first-child {
            width: max-content;
            gap: 3vw;
            @media screen and (max-width: 500px) {
              &:first-child {
                flex-direction: column;
                width: 100%;
                text-align: center;
              }
            }
          }

          display: flex;
          justify-content: space-between;

          & div {
            display: flex;
            flex-direction: column;
            gap: 10px;
            p {
              display: grid;
              grid-template-columns: repeat(2, auto);
              gap: 10px;
              width: fit-content;
              place-items: center;
            }
          }
        }
      }

      &:nth-child(2) {
        gap: 20px;
        grid-area: 2 / 1 / 3 / 2;
        & > p:nth-child(2) {
          width: 300px;
          @media screen and (max-width: 500px) {
            width: 100%;
          }
        }
        & > * {
          width: max-content;
        }
      }
    }

    & > h1 {
      position: absolute;
      right: 10px;
      writing-mode: vertical-rl;
      text-orientation: upright;

      @media screen and (max-width: 800px) {
        right: 50%;
        transform: translateX(50%);
        top: 15px;
        writing-mode: initial;
        text-orientation: initial;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export default Card;
