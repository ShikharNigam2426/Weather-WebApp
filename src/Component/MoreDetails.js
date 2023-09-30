import React from 'react'
import './AllStyles/MoreDetails.css'

// The component containing the Humidity and other data of the City 
// You can see it below Farenhite Celcius Toggle button
const MoreDetails = (props) => {
    return (
        <div>
            <ul id='moreWeather' className="list-group my-5">
                <li className="bg-transparent list-group-item d-flex justify-content-between align-items-center">
                    Humidity(%)
                    <span className="Black">{props.Humidity}</span>
                </li>
                <li className="bg-transparent list-group-item d-flex justify-content-between align-items-center">
                    Pressure(mb)
                    <span className="Black">{props.Pressure}</span>
                </li>
                <li className="bg-transparent list-group-item d-flex justify-content-between align-items-center">
                    Wind(Km/h)
                    <span className="Black">{props.Wind}</span>
                </li>
                <li className="bg-transparent list-group-item d-flex justify-content-between align-items-center">
                Max.Temp(°C)
                    <span className="Black">{props.Max}</span>
                </li>
                <li className="bg-transparent list-group-item d-flex justify-content-between align-items-center">
                Min.Temp(°C)
                    <span className="Black">{props.Min}</span>
                </li>
                <li className="bg-transparent list-group-item d-flex justify-content-between align-items-center">
                Visibilty(Miles)
                    <span className="Black">{props.Visibility}</span>
                </li>
            </ul>
        </div>
    )
}

// Exporting MoreDetails component
export default MoreDetails