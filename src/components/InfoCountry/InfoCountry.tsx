import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {ApiInfoCountry} from "../../types";
import './InfoCountry.css';

interface Props {
  id: string | null;
}

const InfoCountry: React.FC<Props> = ({id}) => {
  const [infoCountry, setInfoCountry] = useState<ApiInfoCountry | null>(null);
  const [borders, setBorders] = useState<string[] | null>(null);

  const fetchInfo = useCallback(async (id: string) => {
    let bordersOfCountry: string[] | null = null;

    const oneCountryResponse = await axios.get<ApiInfoCountry>('/v2/alpha/' + id);

    if (oneCountryResponse.data.borders) {
      const promises = oneCountryResponse.data.borders.map(async border => {
        const countryBorderResponse = await axios.get<ApiInfoCountry>('/v2/alpha/' + border);
        return countryBorderResponse.data.name;
      });
      bordersOfCountry = await Promise.all(promises);
    }

    const info: ApiInfoCountry = {
      name: oneCountryResponse.data.name,
      population: oneCountryResponse.data.population,
      capital: oneCountryResponse.data.capital,
      flag: oneCountryResponse.data.flag,
    }

    setBorders(bordersOfCountry);
    setInfoCountry(info);
  }, []);


  useEffect(() => {
    if (id !== null) {
      fetchInfo(id).catch(console.error)
    }
  }, [id, fetchInfo]);

  return infoCountry ? (
    <div>
      <div className='infoCountry'>
        <div>
          <h4>{infoCountry.name}</h4>
          <p>Столица:<strong style={{margin: '5px'}}>{infoCountry.capital}</strong></p>
          <p>Население: <strong style={{margin: '5px'}}>{infoCountry.population}</strong> чел.</p>
        </div>
        <img className="flag" src={infoCountry.flag} alt="flag"/>
      </div>
      {borders !== null ? (
        <div>
          <h5>Country borders:</h5>
          <ul>
            {borders.map(border => {
              return (
                <li key={Math.random()}>{border}</li>
              )
            })}
          </ul>
        </div>
      ) : (
        <p>
          Эта страна не граничит ни с какой страной!
        </p>
      )}

    </div>
  ) : (
    <div>
      Выбери страну!
    </div>
  );
};

export default InfoCountry;