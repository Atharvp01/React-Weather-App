import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const Weather = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [city, setCity] = useState(`pune`);
  const [bgImage, setBgImage] = useState(`null`);

  const handleClick = () => {
    setButtonClicked(true);
  };

  const handleChange = (event) => {
    setButtonClicked(false);
    setCity(event.target.value);
  };

  const apiKey = `d5702be6756a4739afd23851230607`;

  const API = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  const { data, refetch } = useQuery(["currentData"], async () => {
    return await Axios.get(API).then((response) => {
      return response.data;
    });
  });
  const handleImage = () => {
    refetch();
    setTimeout(() => {
      if (data && data.current && data.current.condition) {
        const conditionCode = data.current.condition.code;
        const is_day = data.current.is_day === 1;
        const imagesUrl = {
          //don't add space between the keys or it will break the app
          "1009,1063,1003": is_day
            ? `/assets/day/cloudy.jpg`
            : `/assets/night/cloudy.jpg`,
          1000: is_day ? `/assets/day/Sunny.jpg` : `/assets/night/clear.jpg`,
          "1240,1273,1195,1183,1243": is_day
            ? `/assets/day/rainy.jpg`
            : `/assets/night/rainy.jpg`,
          1030: is_day ? `/assets/day/mist.jpg` : `/assets/night/mist.jpg`,
        };
        console.log(data.current.condition.text);
        console.log(data);
        const imageMapping = Object.entries(imagesUrl).find(
          ([codes, imageUrl]) =>
            codes.split(",").includes(conditionCode.toString())
        );
        if (imageMapping) {
          const [codes, imageUrl] = imageMapping;
          setBgImage(imageUrl);
        } else {
          alert("something wrong");
        }
      } else console.log("data yet to be fetched");
    }, 1000);
  };

  useEffect(() => {
    if (buttonClicked) {
      handleImage();
    }
    console.log(bgImage);
  }, [data, buttonClicked]);

  return (
    <>
      <div
        className="WeatherContainer h-screen bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <h1 className="text-3xl font-bold pt-8 pl-8 font-mono text-white">
          The Weather
          <br />
          {city.charAt(0).toUpperCase()}
          {city.slice(1)}
        </h1>
        <div className="input-field">
          <input placeholder="Search" onChange={handleChange} />
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
    </>
  );
};

export default Weather;
