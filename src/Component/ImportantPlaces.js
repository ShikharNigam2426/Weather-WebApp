import React, { useState, useEffect } from 'react';
import './AllStyles/ImportantPlaces.css'

// Weather Details of Famous Places
const ImportantPlaces = () => {
    const [cities, setCities] = useState(['Lucknow', 'Delhi', 'Hyderabad', 'Bangalore']);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (city) => {
            try {
                const key = '20487d8b159f07348f5497d74f8fd17e';

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();

                if (jsonData.list && jsonData.list.length > 0) {
                    // Ensure the data structure matches your expectations
                    const cityData = jsonData.list[0];
                    setData((prevData) => ({ ...prevData, [city]: cityData }));
                }
            } catch (error) {
                console.error(`Error fetching data for ${city}:`, error);
            }
        };

        // Fetch data for each city in the "cities" array
        Promise.all(cities.map(fetchData))
            .then(() => setLoading(false)) // Set loading to false when all data is fetched
            .catch((error) => console.error('Error fetching data:', error));
    }, [cities]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                // The below table is a bootstrap table
                <table className="table table-striped table-sm">
                    <thead>
                        <tr id='TopLine' className='paramsLine'>
                            <th className='famous'>Famous Cities</th>
                            <th className='parameter'>Humidity</th>
                            <th className='parameter'>Pressure</th>
                            <th className='parameter'>Max.Temp</th>
                            <th className='parameter'>Wind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city, index) => (
                            <tr className='paramsLine' key={index}>
                                <td className='cityName'>{city}</td>
                                <td className='Values'>{data[city]?.main ? data[city].main.humidity : 'N/A'}</td>
                                <td className='Values'>{data[city]?.main ? data[city].main.pressure : 'N/A'}</td>
                                <td className='Values'>{data[city]?.main ? (data[city].main.temp_max - 273.15).toFixed(2) : 'N/A'}</td>
                                <td className='Values'>{data[city]?.wind ? data[city].wind.speed : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ImportantPlaces;

