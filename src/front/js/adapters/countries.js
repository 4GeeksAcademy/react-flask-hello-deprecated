const countryCodes = {
    "AR": "Argentina",
    "BR": "Brasil",
    "CL": "Chile",
    "CO": "Colombia",
    "PE": "Perú",
    "MX": "México",
    "US": "Estados Unidos",
    "ES": "España",
    "FR": "Francia",
    "GB": "Reino Unido",
  };
  
 
  export const getCountryName = (countryCode) => {
    const countryName = countryCodes[countryCode.toUpperCase()];
    if (!countryName) {
      throw new Error(`Código de país "${countryCode}" no encontrado`);
    }
  
    return countryName;
  };