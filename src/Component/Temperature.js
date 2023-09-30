import React, { useEffect, useState } from 'react';
import Blank from './Blank';
import ImportantPlaces from './ImportantPlaces';
import Weather from './Weather';
import MoreDetails from './MoreDetails';
import './AllStyles/Temperature.css';
import key from './key';


let jsonData = null;

// The layout where all the data is showing is coming from here
const Temperature = () => {
    const [data, setData] = useState(null);
    const [getweather, setGetWeather] = useState(null);
    const [isFahrenheit, setIsFahrenheit] = useState(false);
    const [Humidity, setHumidity] = useState(null);
    const [Wind, setWind] = useState(null);
    const [Pressure, setPressure] = useState(null);
    const [MaxTemp, setMaxTemp] = useState(null);
    const [MinTemp, setMinTemp] = useState(null);
    const [Visibility, setVisibility] = useState(null);

    // function which fetch the data from the API
    const fetchData = async (city) => {
        try {

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            jsonData = await response.json();

            if (jsonData.list && jsonData.list[0] && jsonData.list[0].main) {
                const celsiusTemp = jsonData.list[0].main.temp;
                setData(celsiusTemp);
                setGetWeather(jsonData.list[0].weather[0].description);
                setHumidity(jsonData.list[0].main.humidity);
                setPressure(jsonData.list[0].main.pressure);
                setWind(jsonData.list[0].wind.speed);
                setMaxTemp(jsonData.list[0].main.temp_max);
                setMinTemp(jsonData.list[0].main.temp_min);
                setVisibility(jsonData.list[0].visibility);
                console.log(jsonData);
            }

            const weatherCondition = jsonData.list[0].weather[0].main;

            console.log(weatherCondition);

            // Changing background according to the Weather
            const area = document.body;
            let background = null;

            if (weatherCondition === 'Clouds') {
                background = 'url(./Images/CloudyBack.png)';
            }
            else if (weatherCondition === 'Clear') {
                background = 'url(./Images/SunnyBack.png)';
            }
            else if (weatherCondition === 'Rain') {
                background = 'url(./Images/RainBackground.png)';
            }
            else if (weatherCondition === 'Snow') {
                background = 'url(./Images/WinterBack.png)';
            }
            if (background) {
                area.style.backgroundImage = background;
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const defaultCity = 'Mumbai';
        fetchData(defaultCity);
    }, []);

    // Callback function calls the fetch function for the given City name
    const handleSearch = (e) => {
        e.preventDefault();
        const city = document.getElementById('SearchInput').value;
        if (city !== '') {
            fetchData(city);
        }
    };

    // function for toggling to Farenhite
    const toggleTemperatureUnit = () => {
        setIsFahrenheit(!isFahrenheit);
    };

    // function for toggling to Celcius
    const convertToCelsius = (temp) => {
        return (temp - 273.15).toFixed(1);
    };

    // Function to convert Celcius to Farenhite
    const convertToFahrenheit = (temp) => {
        return ((temp - 273.15) * (9 / 5) + 32).toFixed(1);
    };

    return (
        <div>
            <div className="row">
                <div className="col-lg-8 col-md-7 col-7 left">
                    <Blank />
                    <Weather weather={getweather} />
                    <ImportantPlaces />
                </div>
                <div className="col-lg-4 col-md-5 col-5 right background-blur">
                    <form className="Search-Area form-inline my-2 my-lg-0" onSubmit={handleSearch}>
                        <div className="row">
                            <input
                                id='SearchInput'
                                className="col-lg-8 col-md-6 col-sm-12 form-control"
                                type="search"
                                placeholder="Enter City Name"
                            />
                            <button
                                id='Search'
                                className="col-lg-4 col-md-6 col-sm-12 btn btn-success my-2 my-sm-0"
                                type="submit"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <h1
                        id='temp'
                        className='MainTemp my-lg-5 my-md-4 my-sm-3'
                        style={{ overflow: 'hidden' }}
                    >
                        {data ? (isFahrenheit ? convertToFahrenheit(data) + ' F' : convertToCelsius(data) + ' C') : ''}&deg;
                    </h1>

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={toggleTemperatureUnit} className="btn btn-secondary">
                            {isFahrenheit ? 'Celsius' : 'Fahrenheit'}
                        </button>
                    </div>
                    <MoreDetails Humidity={Humidity} Pressure={Pressure} Wind={Wind} Max={MaxTemp} Min={MinTemp} Visibility={Visibility} />
                </div>
            </div>
        </div>
    );
};

// Export jsonData and Temperature component
export { jsonData };
export default Temperature;
