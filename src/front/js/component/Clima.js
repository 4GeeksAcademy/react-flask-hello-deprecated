import React, { useEffect, useState } from 'react';
import { getWeatherByCountryCode } from '../services/weather/weather.services';
import { getCountryName } from '../adapters/countries';
import { FaCloud, FaWind, FaSun } from 'react-icons/fa'; // Importing icons

const Clima = () => {
  const [weatherData, setWeatherData] = useState({
    country: 'CL',  // Default country set to 'CL' (Chile)
    temps: [],
  });
  const [selectedCountry, setSelectedCountry] = useState('CL');  // State for selected country

  // List of country codes (you can extend this list as needed)
  const countryList = [
    { code: 'CL', name: 'Chile' },
    { code: 'US', name: 'United States' },
    { code: 'AR', name: 'Argentina' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
  ];

  // Fetch weather data based on selected country
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWeatherByCountryCode(selectedCountry);
        console.log("API response:", response);

        setWeatherData({
          country: response.country, 
          temps: response.temps, 
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchData();
  }, [selectedCountry]);  // Refetch when the selected country changes

  // Handle country selection change
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="clima-container" style={{ padding: '20px', backgroundColor: '#E3F2FD' }}>
      <h2>Weather in {getCountryName(weatherData.country)}</h2>
      
      {/* Dropdown to select a country */}
      <select 
        value={selectedCountry} 
        onChange={handleCountryChange}
        style={{ padding: '10px', marginBottom: '20px' }}
      >
        {countryList.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Display weather data */}
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        {weatherData.temps.map((item, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <p>{item.day}</p>
            <p>{item.temp}°C</p>
            <p>{item.description}</p>
            
            {/* Cloudy icon */}
            <p>
              {item.isCloudy ? <FaCloud style={{ color: 'gray' }} /> : <FaSun style={{ color: 'yellow' }} />}
            </p>
            
            {/* Windy icon */}
            <p>
              {item.isWindy ? <FaWind style={{ color: 'blue' }} /> : 'Calm'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clima;
