import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherApiResponse } from 'src/model/WeatherApi';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = "https://api.openweathermap.org/data/2.5"
  private apiKey = "a7a15573b36d0ed04741251ef8de20e7"

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<WeatherApiResponse> {
    return this.httpClient.get<WeatherApiResponse>(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  convertKelvinToCelsius(kelvinTemperature: number): number {
    return parseFloat((kelvinTemperature - 273.15).toFixed(1))
  }
}
