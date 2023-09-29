import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
moment().format();
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Card from "./components/Card";

const queryClient = new QueryClient();

export default function FetchData() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReturnData />
    </QueryClientProvider>
  );
}

const ReturnData = () => {
  const [stateData, setStateData] = useState([]);
  const [fullData, setFullData] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [dataValidation, setDataValidation] = useState(false);
  let table = [];

  useEffect(() => {
    fetch("https://ipinfo.io/93.15.27.29?token=c0094bca9d28f7")
      .then((res) => res.json())
      .then((data) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          setStateData([
            pos.coords.latitude,
            pos.coords.longitude,
            data.city,
            data.region,
            data.timezone,
          ]);
        });
      });
  }, []);

  if (stateData.length > 0 && Object.keys(fullData).length < 1) {
    let m = moment().add(2, "days");
    let dayDateStart = moment(
      new Date(moment()._d).toLocaleDateString("en")
    ).format("YYYY-MM-DD");
    let dayDateEnd = new Date(m._d)
      .toISOString()
      .slice(0, new Date().toISOString().indexOf("T"));

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${stateData[0]}&longitude=${stateData[1]}&hourly=temperature_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&forecast_days=3&timezone=${stateData[4]}`
    )
      .then((res) => res.json())
      .then((data) => setFullData(data));
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${stateData[0]}&longitude=${stateData[1]}&hourly=european_aqi&timezone=${stateData[4]}&start_date=${dayDateStart}&end_date=${dayDateEnd}`
    )
      .then((res) => res.json())
      .then((data) => setAirQuality(data.hourly));
  }
  //debug les states => info pour passer au front

  return Object.keys(fullData).length > 0 &&
    stateData.length > 0 &&
    Object.keys(airQuality).length > 0 ? (
    <Card
      airQuality={airQuality}
      locationInformation={stateData}
      weatherInformation={fullData}
    />
  ) : null;
};
