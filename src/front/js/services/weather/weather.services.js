const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;


// Hardcoded coordinates of country capitals (latitude, longitude)
const countryCoordinates = {
  'CL': { lat: -33.4489, lon: -70.6693 }, 
  'US': { lat: 38.9072, lon: -77.0369 }, 
  'AR': { lat: -34.6037, lon: -58.3816 }, 
  'BR': { lat: -15.7801, lon: -47.9292 },
  'MX': { lat: 19.4326, lon: -99.1332 }, 
};
 

const getCoordinatesByCountryCode = (countryCode) => {
  const coordinates = countryCoordinates[countryCode];
  if (coordinates) {
    return coordinates;
  } else {
    throw new Error(`Coordinates for country code ${countryCode} not found.`);
  }
};
export const getWeatherByCountryCode = async (countryCode) => {
  try {
    // Get coordinates for the country code
    const { lat, lon } = await getCoordinatesByCountryCode(countryCode);

    // Fetch weather data based on the coordinates
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching weather: ${response.statusText}`);
    }
  
    const data = await response.json();
    console.log("Weather data:", data);

    const uniqueDays = new Set();
    const formattedData = data.list
      .filter(item => {
        const day = new Date(item.dt * 1000).toLocaleDateString();
        if (uniqueDays.has(day)) return false;
        uniqueDays.add(day);
        return true;
      })
      .map(item => ({
        dt: new Date(item.dt * 1000).toLocaleDateString(),
        temp: (item.main.temp - 273.15).toFixed(1), 
        description: item.weather[0].description,
        day: new Date(item.dt * 1000).toLocaleDateString('es', { weekday: 'long' }),
        isCloudy: item.clouds.all > 0,
        isWindy: item.wind.speed > 5,
      }));
    
    return {
      country: data.city.country,
      temps: formattedData,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { error: error.message };
  }
};