import Image from "next/image";

interface PredictWeather {
  date: string;
  temperature: string;
  id: number;
    main: string;
    description: string;
    icon: string;
  
  windSpeed: string;
  dt_txt: string;
}

export default function Forecast(props: { data: PredictWeather[] }) {
  const { data } = props;

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

  if (!data?.length) {
    return <div>No forecast data available</div>;
  }

  return (
    <div className="flex flex-col">
        {data.map((weather, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start justify-start md:justify-between space-y-4 md:space-y-0 md:space-x-8 p-4">
               
                <div className="text-left">
                  <span className="block mb-1 font-bold text-blue-500">Date: </span>
                  <span>{new Date(weather.date).toDateString()}</span>
                </div>
                <div className="text-left">
                  <span className="block mb-1 font-bold text-blue-500">Temperature: </span>
                  <span>{weather.temperature}°C</span>
                </div>
                
                <div className="text-left">
                  <span className="block mb-1 font-bold text-blue-500">Weather: </span>
                  <span>{weather.main}</span>
                </div>
                <img
                  src={getWeatherImage(weather.main)}
                  className="w-10 h-10"
                  alt="weather-icon"
                />
                <div className="text-left">
                  <span className="block mb-1 font-bold text-blue-500">Description: </span>
                  <span>{weather.description}</span>
                </div>
                <div className="text-left">
                  <span className="block mb-1 font-bold text-blue-500">Wind Speed:</span>
                  <span>{weather.windSpeed}</span>
                </div>
              
            </div>
        ))}
</div>

  );
}
