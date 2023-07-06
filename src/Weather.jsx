import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const Weather = () => {
  const apiKey = `d5702be6756a4739afd23851230607`;

  let city = `pune`;

  const API = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  const { data } = useQuery(["currentData"], async () => {
    return Axios.get(API).then((response) => response.data);
  });

  const [bgImage, setBgImage] = useState(``);

  useEffect(() => {
    const handleImage = () => {
      if (data && data.current && data.current.is_day) {
        const is_day = data.current.is_day === 1;
        if (is_day) {
          const imageUrl = `/assets/day/${data.current.condition.text}.jpg`;
          setBgImage(imageUrl);
        }
        console.log(data.current.condition.text);
      }
    };
    handleImage();
  }, [data]);

  return (
    <>
      <div
        className="WeatherContainer h-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <h1 className="text-white text-3xl font-bold pt-8 pl-8 font-mono">
          The Weather
        </h1>
      </div>
    </>
  );
};

export default Weather;
