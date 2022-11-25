import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {ApiCountries} from "../../types";
import InfoCountry from "../../components/InfoCountry/InfoCountry";

interface Country {
  name: string;
  code: string;
}

const AboutCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<ApiCountries[]>('/v2/all?fields=alpha3Code,name');

    const newCountry = countriesResponse.data.map(country => {
      return {
        name: country.name,
        code: country.alpha3Code
      }
    })
    setCountries(newCountry)
  }, []);

  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData]);

  return (
    <div style={{display: 'flex'}}>
      <div style={{marginRight: '150px'}}>
        <ol>
          {countries.map(country => (
            <li
              key={Math.random()}
              onClick={() => setSelectedCountryCode(country.code)}
            >
              {country.name}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <InfoCountry id={selectedCountryCode}/>
      </div>
    </div>
  );
};

export default AboutCountries;