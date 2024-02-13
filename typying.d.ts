interface ICurrentProps {
    lastUpdated: string;
    temperature: number;
    weather: [
        {
          id: number;
          main: string;
          description: string;
          icon:  string;
        }
      ],
    windSpeed: number;
}

interface PredictWeather {
  date: string;
  temperature: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  windSpeed: string;
  dt_txt: string; 
}



  interface IWeatherForecast {
    list: [
      {
        main: {
          temp: number;
        };
        weather: [
          {
            main: string;
            description: string;
          }
        ];
        wind: {
          speed: number;
        };
        dt_txt: string;
      }
    ];
  }