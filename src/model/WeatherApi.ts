export interface WeatherApiResponse {
    name: string;
    weather: Array<Weather>;
    main: Main;
    sys: Sys;
}


export interface Weather {
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

export interface Sys {
    country: string;
}