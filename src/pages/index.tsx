import Image from "next/image";
import { useState } from "react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Forecast from "@/components/Forecast";
import WeatherForecast from "@/components/WeatherForecast";


const getWeatherImage = (weather: string) => {
  if (weather === "Rain") {
    return "/SVG/rainny_1.svg";
  } else if (weather === "Clouds") {
    return "/SVG/cloudy_1.svg";
  } else if (weather === "Clear") {
    return "/SVG/sunny.svg";
  } else {
    return "";
  }
};

export default function Home() {
  const apiKey = "be27d1ad86b86d9effd7d8bdefd60c3f";
  const [currentWeather, setCurrentWeather] = useState<ICurrentProps | null>(null);
  const [location, setLocation] = useState('');
  const [forecastWeather, setForecastWeather] = useState<PredictWeather[]>([]);

  const InputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = location;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=40`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const currentWeatherData: ICurrentProps = {
          lastUpdated: new Date(data.dt * 1000).toDateString(),
          temperature: data.main.temp,
          weather: data.weather[0].main,
          windSpeed: data.wind.speed,
     
        };
        setCurrentWeather(currentWeatherData);
      })
      .catch((error) => {
        console.error(error);
      });

      fetch(forecastUrl)
      .then((res) => res.json())
      .then((data) => {
        const groupedForecast: { [date: string]: PredictWeather } = {};
    
        data.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000).toDateString();
          
                  if (!groupedForecast[date]) {
           
            groupedForecast[date] = {
              date: date,
              temperature: item.main.temp.toFixed(1),
              weather: item.weather[0].main,
              description: item.weather[0].description,
              windSpeed: item.wind.speed,
            };
          }
        });
    
        const forecastArray: PredictWeather[] = Object.values(groupedForecast);
        const next5DaysForecast: PredictWeather[] = forecastArray.slice(0, 5);
          setForecastWeather(next5DaysForecast);
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-24">
    <header className="flex flex-col items-center justify-center md:flex-row md:justify-between md:items-center lg:justify-around px-4 py-6">
  
  <Image
    src="/logo.svg"
    width={150}
    height={150}
    alt="logo"
    className="mb-4 md:mb-0 md:mr-4"
  />
  <form onSubmit={InputSubmit} className="flex flex-col md:flex-row md:items-center">
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Enter location here.."
      className="mb-2 md:mb-0 md:mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Check the Weather
    </button>
  </form>
</header>


      {currentWeather ? (
        <Container data={[currentWeather]} />
      ) : (
        <div>Data not available</div>
      )}
      <Forecast data={forecastWeather} getWeatherImage={getWeatherImage} />
     
      <Footer />
    </div>
  );
}
