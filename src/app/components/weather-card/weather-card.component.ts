import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherApiResponse } from 'src/model/WeatherApi';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  lat: number = 0
  lon: number = 0
  weatherResponse: WeatherApiResponse | undefined
  currentWeather: CurrentWeather | undefined

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.initUI()
  }

  initUI() {
    this.getCurrentPosition().then((res) => {
      this.lat = res.latitude
      this.lon = res.longitude

      this.getCurrentWeather()
    })
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.lat, this.lon).subscribe({
      next: (data) => this.weatherResponse = data,
      error: (err) => console.error(err),
      complete: () => {
        this.currentWeather = this.mapearResponse(this.weatherResponse!!)
        this.chooseWeatherBg()
      }
    })
  }

  mapearResponse(weatherResponse: WeatherApiResponse): CurrentWeather {
    return {
      name: weatherResponse.name,
      icon: this.formatImage(weatherResponse.weather[0].icon),
      humidity: weatherResponse.main.humidity,
      maxTempCelsius: this.weatherService.convertKelvinToCelsius(weatherResponse.main.temp_max),
      minTempCelsius: this.weatherService.convertKelvinToCelsius(weatherResponse.main.temp_min),
      currentTempCelsius: this.weatherService.convertKelvinToCelsius(weatherResponse.main.temp),
      weatherMain: weatherResponse.weather[0].main
    }
  }

  chooseWeatherBg(): string {
    let urlImage = ""

    switch (this.currentWeather?.weatherMain.toLowerCase()) {
      case WEATHER_ICONS.clear.name: urlImage = WEATHER_ICONS.clear.url; break;
      case WEATHER_ICONS.clouds.name: urlImage = WEATHER_ICONS.clouds.url; break;
      case WEATHER_ICONS.fog.name: urlImage = WEATHER_ICONS.fog.url; break;
      case WEATHER_ICONS.rain.name: urlImage = WEATHER_ICONS.rain.url; break;
      case WEATHER_ICONS.snow.name: urlImage = WEATHER_ICONS.snow.url; break;
      case WEATHER_ICONS.thunder.name: urlImage = WEATHER_ICONS.thunder.url; break;
    }

    return urlImage
  }

  formatImage(icon: string): string {
    return `http://openweathermap.org/img/w/${icon}.png`
  }

  async getCurrentPosition(): Promise<LatitudeLongitude> {
    return new Promise<LatitudeLongitude>((resolve, reject) => {
      let latitude = 0
      let longitude = 0
      if (navigator.geolocation) {
        const success = (position: any) => {
          latitude = position.coords.latitude
          longitude = position.coords.longitude

          resolve({ latitude, longitude })
        }

        navigator.geolocation.getCurrentPosition(success, function (msg: any) {
          reject(new Error(msg))
        })
      }
    })
  }
}

export interface LatitudeLongitude {
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  name: string;
  currentTempCelsius: number;
  minTempCelsius: number;
  maxTempCelsius: number;
  weatherMain: string;
  icon: string;
  humidity: number;
}

export interface WeatherIcons {
  clear: string;
  clouds: string;
  fog: string;
  rain: string;
  snow: string;
  thunder: string;
}

export const WEATHER_ICONS = {
  clear: {
    name: "clear",
    url: "../assets/img/clear.png"
  },
  clouds: {
    name: "clouds",
    url: "../assets/img/clouds.png"
  },
  fog: {
    name: "fog",
    url: "../assets/img/fog.png"
  },
  rain: {
    name: "rain",
    url: "../assets/img/rain.png"
  },
  snow: {
    name: "snow",
    url: "../assets/img/snow.png"
  },
  thunder: {
    name: "thunder",
    url: "../assets/img/thunder.png"
  }
}