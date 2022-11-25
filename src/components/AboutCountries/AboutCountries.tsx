import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {ApiCountries} from "../../types";
import Country from "../Country/Country";
import InfoCountry from "../InfoCountry/InfoCountry";

interface Country {
  name: string;
  code: string;
}

const AboutCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<ApiCountries[]>('/v2/all?fields=alpha3Code,name')

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
  }, [fetchData])


  return (
    <div>
      <div>
        <InfoCountry id={selectedCountryCode}/>
      </div>


      {countries.map(country => (
        <Country key={Math.random()} name={country.name} onClick={() => setSelectedCountryCode(country.code)}/>
      ))}


    </div>
  );
};

export default AboutCountries;