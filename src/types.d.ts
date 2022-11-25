export interface ApiCountries {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export interface ApiInfoCountry {
  name: string;
  capital: string;
  population: number;
  flag: string;
  borders: string[];
}
